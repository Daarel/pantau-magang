"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppSidebar } from "@/components/app-sidebar";

import Navbar from "@/components/layout/Navbar";
import { FC, ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      <div className='flex flex-1'>
        <SidebarProvider>
          <div className='flex min-h-screen w-full'>
            <AppSidebar />
            <SidebarInset>
              <main className='p-4 mt-16 sm:mt-12'>{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default LayoutWrapper;
