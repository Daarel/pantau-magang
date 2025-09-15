"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import ProfileDropDown from "./ProfileDropdown";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className='z-50 w-full border-b bg-white py-2 shadow-sm flex justify-between px-6 items-center'>
      <div className='flex items-center gap-3'>
        <div className='md:hidden'>
          <SidebarTrigger />
        </div>
        <Image
          src='/logoESDM.png'
          alt='Logo Kementrian Energi dan Sumber Daya Mineral'
          width={40}
          height={40}
          priority
          className='size-10'
        />
        <span className='hidden sm:block sm:font-bold sm:text-md'>
          PANTAU MAGANG
        </span>
      </div>

      <NavigationMenu>
        <NavigationMenuList className='flex items-center gap-4'>
          <ProfileDropDown
            username={user ? user?.user_metadata.full_name?.split(" ")[0] : "Loading user..."}
            role={
              user
                ? user?.user_metadata.role[0].toUpperCase() +
                  user?.user_metadata.role.slice(1)
                : "Loading role..."
            }
          />
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
