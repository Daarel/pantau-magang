"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className='flex flex-col w-full h-screen'>
        <Navbar />
        <div className='flex flex-1 overflow-auto'>
          <div className='flex h-full w-full'>
            <AppSidebar />
            <SidebarInset>
              <main className='p-4'>{children}</main>
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LayoutWrapper;
