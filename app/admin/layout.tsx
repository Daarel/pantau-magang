"use client";

import type { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FaUser, FaUserTie } from "react-icons/fa";
import { BsHouse } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";

type Admin = {
  title: string;
  path: string;
  Icon: IconType;
};

const admin: Admin[] = [
  { title: "Dashboard", path: "/admin/dashboard", Icon: BsHouse },
  { title: "User", path: "/admin/user", Icon: FaUser },
  { title: "Supervisor", path: "/admin/supervisor", Icon: FaUserTie },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className='flex flex-col w-full h-screen'>
        <Navbar />
        <div className='flex flex-1 overflow-auto'>
        <Sidebar>
          <SidebarMenu className="mt-16 max-sm:mt-5">
            {admin.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className='flex items-center gap-3 pl-5 py-2 rounded-md transition-colors'
                  >
                    <Link href={item.path}>
                      <item.Icon className='h-9 w-9' />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </Sidebar>
          <div className='flex h-full w-full'>
            <SidebarInset>
              <main className='p-4'>{children}</main>
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
