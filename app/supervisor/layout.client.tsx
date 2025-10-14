"use client";

import type { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { supervisorMenu } from "@/const/index";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface SupervisorLayoutProps {
  children: ReactNode;
}

export default function SupervisorLayoutClient({ children }: SupervisorLayoutProps) {
  const pathname = usePathname();
  const supabase = createClient();

  const [hasInboxNotification, setHasInboxNotification] = useState(false);

  useEffect(() => {
    const fetchPendingDispensation = async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("id")
        .eq("dispensation", "pending");

      if (error) {
        console.error("Error fetching pending dispensation:", error);
        return;
      }

      setHasInboxNotification(data.length > 0);
    };

    fetchPendingDispensation();

    const channel = supabase
      .channel("attendance-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "attendance" },
        (payload) => {
          const newStatus = (payload.new as { dispensation?: string })?.dispensation;
          const oldStatus = (payload.old as { dispensation?: string })?.dispensation;

          // 🔴 Muncul saat ada data baru yang pending
          if (newStatus === "pending") {
            setHasInboxNotification(true);
          }

          // 🟢 Hilang saat status berubah jadi approved ATAU n_approved
          if (
            oldStatus === "pending" ||
            newStatus === "approved" ||
            newStatus === "n_approved" // ✅ tambahin ini
          ) {
            fetchPendingDispensation();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // 🔁 Cek ulang setiap pindah halaman
  useEffect(() => {
    const checkOnRouteChange = async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("id")
        .eq("dispensation", "pending");
      if (!error) setHasInboxNotification(data.length > 0);
    };
    checkOnRouteChange();
  }, [pathname]);

  return (
    <SidebarProvider>
      <div className="flex flex-col w-full h-screen capitalize">
        <Navbar />
        <div className="flex flex-1 overflow-x-hidden">
          <Sidebar>
            <SidebarMenu className="mt-16 max-sm:mt-5">
              {supervisorMenu.map((menu) => {
                const isActive = pathname.startsWith(menu.path);

                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="flex items-center gap-3 pl-5 h-10 transition-colors relative"
                    >
                      <Link href={menu.path}>
                        <menu.Icon className="h-9 w-9" />
                        {menu.title}

                        {menu.title.toLowerCase() === "inbox" &&
                          hasInboxNotification && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 rounded-full h-3 w-3 animate-pulse"></span>
                          )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </Sidebar>

          <div className="flex h-full w-full">
            <SidebarInset>
              <main className="p-4">{children}</main>
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
