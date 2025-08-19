"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {logoutUser} from "@/lib/client/auth"; // Assuming you have a logout function

export default function Navbar() {
  // Data dummy
  const user = { full_name: "John Doe" };
  const router = useRouter();
  const handleLogout = () => {
    logoutUser(); // Call the logout function to clear user data
    router.push("/"); // Redirect to login page after logout
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 w-full border-b bg-white px-4 py-2 shadow-sm flex justify-between items-center'>
      {/* Logo & Nama Perusahaan */}
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-gray-300 rounded' />
        <span className='font-bold text-lg'>PT Dummy Corp</span>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className='flex items-center gap-4'>
          <NavigationMenuItem>
            <div className='flex items-center gap-2'>
              <div className='flex flex-col'>
                <span>{user.full_name}</span>
                <span className='text-sm text-gray-600'></span>
              </div>
              <Avatar>
                <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant='destructive' size='sm' onClick={handleLogout}>
              <FiLogOut className='' />
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
