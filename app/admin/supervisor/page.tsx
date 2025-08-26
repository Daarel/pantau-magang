"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { supervisorModalInput } from "@/const";
import CustomDialog from "@/components/CustomDialog";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function AdminSupervisor() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("All Records");
  const [open, setOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();

  // Sync state saat url berubah (mis. user buka langsung /admin/supervisor?modal=open)
  useEffect(() => {
    const modal = searchParams?.get("modal");
    // console.log("search params modal =", modal);
    setOpen(modal === "open");
  }, [searchParams]);

  // buka/tutup via tombol — gunakan newOpen agar tidak bergantung pada state yang belum ter-update
  const handleOpenModal = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      router.replace(`${pathname}?modal=open`);
    } else {
      router.replace(pathname);
    }
  };

  // handler untuk onOpenChange dari CustomDialog (klik outside / tombol X)
  const handleOpenChange = (newVal: boolean) => {
    setOpen(newVal);

    if (newVal) {
      router.replace(`${pathname}?modal=open`);
    } else {
      // hapus param modal dari URL tanpa menambah history
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
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Daftar Supervisor</h1>
            <p className='text-gray-500'>List daftar nama Supervisor aktif</p>
          </div>
          <button
            onClick={handleOpenModal}
            className='cursor-pointer flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
          >
            <AiOutlineUserAdd className='h-6 w-auto' />
            <span className='text-xs'>Add Supervisor</span>
          </button>
        </div>

        <div className='mt-6 border-b max-w-[1000px] overflow-x-scroll'>
          <div className='flex gap-6 min-w-max'>
            {[
              "Semua Gedung",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='mt-6 space-y-4'></div>

        {/* CustomDialog di sini */}
        <CustomDialog
          open={open}
          onOpenChange={handleOpenChange} // jangan kirim setOpen langsung
          title='Tambah Supervisor'
          fields={supervisorModalInput}
          onSubmit={handleSubmit}
        />
      </div>
    </LayoutWrapper>
  );
}
