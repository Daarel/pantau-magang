// components/layout/LayoutWrapper.tsx
"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Navbar from "@/components/layout/Navbar";
import { FC, ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar"; // Pastikan ini versi client-friendly
import { SessionData } from '@/lib/server/auth';

interface LayoutWrapperProps {
  children: ReactNode;
  session: SessionData | null; // Terima session sebagai prop
}

const LayoutWrapper: FC<LayoutWrapperProps> = ({ 
  children,
  sidebar 
}) => {
  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      <div className='flex flex-1'>
        <SidebarProvider>
          <div className='flex min-h-screen w-full'>
            <AppSidebar />
            {sidebar}
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
