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
import { adminMenu } from "@/const/index";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className='flex flex-col w-full h-screen capitalize'>
        <Navbar />
        <div className='flex flex-1 overflow-x-hidden'>
          <Sidebar>
            <SidebarMenu className='mt-16 max-sm:mt-5'>
              {adminMenu.map((menu) => {
                const href = menu.query
                  ? `${menu.path}?${new URLSearchParams(menu.query).toString()}`
                  : menu.path;

                const isActive =
                  pathname === menu.path ||
                  pathname.startsWith(`${menu.path}/`);

                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className='flex items-center gap-3 pl-5 h-10 transition-colors'
                    >
                      <Link href={href}>
                        <menu.Icon className='h-9 w-9' />
                        {menu.title}
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
