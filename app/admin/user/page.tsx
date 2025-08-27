"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { internModalInput } from "@/const";
import { DataTable } from "@/components/tables/DataTable";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import CustomDialog from "@/components/CustomDialog";
import TablePageHeader from "@/components/tables/TablePageHeader";

export default function AdminUser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const modal = searchParams?.get("modal");
    setOpen(modal === "open");
  }, [searchParams]);

  const handleToggleModal = () => {
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
        <TablePageHeader
          title='Daftar Anak Magang'
          subtitle='List daftar anak magang aktif'
          label="Tambah User"
          onAdd={handleToggleModal}
        />
        <DataTable />
        <CustomDialog
          open={open}
          onOpenChange={handleOpenChange}
          title='Tambah User'
          fields={internModalInput}
          onSubmit={handleSubmit}
        />
      </div>
    </LayoutWrapper>
  );
}
