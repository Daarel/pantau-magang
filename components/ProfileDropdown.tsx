import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useState, useEffect, type FC } from "react";

interface profileDropDown {
  username: string;
  role: string;
}

const ProfileDropDown: FC<profileDropDown> = ({ username, role }) => {
  const [openModal, setOpenModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/avatar_fallback.png");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchAvatar = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("users")
        .select("photo_url, role")
        .eq("auth_id", session.user.id)
        .single();

      if (error) {
        console.error("Gagal ambil avatar:", error);
        return;
      }

      setAvatarUrl(data?.photo_url || "/avatar_fallback.png");
    };

    fetchAvatar();

    const handler = () => fetchAvatar();
    window.addEventListener("profile-updated", handler);

    return () => window.removeEventListener("profile-updated", handler);
  }, []);

  const handleNavigate = async (page: string) => {
    switch (page) {
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Logout error:", error.message);
        } else {
          router.push("/");
        }
        break;
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className='flex flex-row justify-center items-center gap-3'>
      <span className='md:text-lg md:font-normal font-normal tracking-wide'>
        {username}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <Image src={avatarUrl} width={40} height={40} alt='Profile' />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuLabel>{role}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleNavigate("profile")}>
            <FaUser className='mr-2 h-4 w-4' />
            <span className='cursor-pointer'>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenModal}>
            <IoLogOutOutline className='mr-2 h-4 w-4 text-red-600' />
            <span className='cursor-pointer text-red-600'>Keluar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent showCloseButton={false} className='h-1/4'>
          <DialogHeader>
            <DialogTitle className='title__header'>
              Apakah Anda yakin ingin keluar?
            </DialogTitle>
            <p className='text-gray-600'>
              Anda akan keluar dari akun ini dan perlu login kembali.
            </p>
          </DialogHeader>
          <DialogFooter className='flex justify-center items-center gap-3'>
            <button
              onClick={() => handleNavigate("logout")}
              className='cursor-pointer px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-400 transition-all shadow-md'
            >
              Keluar
            </button>
            <DialogClose asChild>
              <button className='cursor-pointer px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors shadow-sm'>
                Batal
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDropDown;
function setRole(arg0: any) {
  throw new Error("Function not implemented.");
}
