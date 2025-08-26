"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { internModalInput } from "@/const";
import CustomDialog from "@/components/CustomDialog";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function InternSupervisor() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("All Records");
  const [open, setOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const modal = searchParams?.get("modal");
    setOpen(modal === "open");
  }, [searchParams]);

  const handleOpenModal = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      router.replace(`${pathname}?modal=open`);
    } else {
      router.replace(pathname);
    }
  };

  const handleOpenChange = (newVal: boolean) => {
    setOpen(newVal);

    if (newVal) {
      router.replace(`${pathname}?modal=open`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("modal");
      const next = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(next);
    }
  };

  const handleSubmit = () => {};

  return (
    <LayoutWrapper>
      <div className='min-h-screen bg-gray-50 p-6'>
      

        <CustomDialog
          open={open}
          onOpenChange={handleOpenChange}
          title='Tambah Supervisor'
          fields={internModalInput}
          onSubmit={handleSubmit}
        />
      </div>
    </LayoutWrapper>
  );
}
