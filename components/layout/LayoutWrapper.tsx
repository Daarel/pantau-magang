"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/layout/Navbar";
import { FC, ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className='flex flex-col w-full h-screen'>
      <Navbar />
      <div className='flex flex-1 overflow-hidden'>
        <SidebarProvider>
          <div className='flex h-full w-full'>
            <AppSidebar />
            <SidebarInset>
              <main className='p-4 overflow-auto'>{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default LayoutWrapper;