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
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SupervisorLayoutProps {
  children: ReactNode;
}

export default function SupervisorLayout({ children }: SupervisorLayoutProps) {
  const pathname = usePathname();
  const [hasPending, setHasPending] = useState(false);

  // cek apakah ada data pending
  async function fetchPending() {
    const { count, error } = await createClient()
      .from("attendance")
      .select("id", { count: "exact", head: true })
      .eq("dispensation", "pending");

    if (error) {
      console.error("Error fetching pending leaves:", error);
    } else {
      setHasPending((count ?? 0) > 0);
    }
  }

  useEffect(() => {
    fetchPending();
    // auto refresh setiap 10 detik
    const interval = setInterval(fetchPending, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-auto">
          <Sidebar>
            <SidebarMenu className="mt-16 max-sm:mt-5">
              {supervisorMenu.map((menu) => {
                const isActive = pathname.startsWith(menu.path);

                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="flex items-center gap-3 pl-5 py-2 rounded-md transition-colors"
                    >
                      <Link
                        href={menu.path}
                        className="flex items-center gap-2 relative"
                      >
                        <menu.Icon className="h-9 w-9" />
                        <span className="flex items-center gap-2">
                          {menu.title}
                          {/* notif dot merah kalau ada pending */}
                          {menu.title === "Inbox" && hasPending && (
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                          )}
                        </span>
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
