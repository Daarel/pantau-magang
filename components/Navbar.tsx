"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/logo.png";
import ProfileDropDown from "./ProfileDropdown";

export default function Navbar() {
  return (
    <nav className='z-50 w-full border-b bg-white py-2 shadow-sm flex justify-between px-6 items-center'>
      <div className='flex items-center gap-3'>
        <div className='md:hidden'>
          <SidebarTrigger />
        </div>
        <Image
          src={logo}
          alt='Logo Kementrian Energi dan Sumber Daya Mineral'
          priority
          className='size-10'
        />
        <span className='hidden sm:block sm:font-bold sm:text-md'>
          PANTAU MAGANG
        </span>
      </div>

      <NavigationMenu>
        <NavigationMenuList className='flex items-center gap-4'>
          <ProfileDropDown username='Daarel' role='supervisor' />
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
