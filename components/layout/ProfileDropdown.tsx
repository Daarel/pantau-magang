
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/client/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

interface profileDropDown {
  username: string;
  role: string;
}

export default function ProfileDropDown({ username, role }: profileDropDown) {
  const router = useRouter();
  const handleNavigate = (page: string) => {
    switch (page) {
      case "profile":
        router.push("/");
        break;
      case "logout":
        logoutUser();
        router.push("/");
        break;
    }
  };

  return (
    <div className='flex flex-row justify-center items-center gap-3'>
      <span className='md:text-lg md:font-normal font-normal tracking-wide'>{username}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarImage src='https://i.pravatar.cc/100' alt='Profile' />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuLabel>{role}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleNavigate("profile")}>
            <FaUser className='mr-2 h-4 w-4' />
            <span className="cursor-pointer">Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigate("logout")}>
            <IoLogOutOutline className='mr-2 h-4 w-4 text-red-600' />
            <span className="cursor-pointer text-red-600">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
