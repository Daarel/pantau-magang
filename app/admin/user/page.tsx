"use client";

import { LuArrowUpDown } from "react-icons/lu";
import { RiMoreFill, RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";
import { dataColumnIntern, type DataColumn } from "@/const/dummy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { internModalInput } from "@/const";
import DataTable from "@/components/DataTable";
import CustomDialog from "@/components/CustomDialog";
import TablePageHeader from "@/components/DataTableHeader";

const columns: ColumnDef<DataColumn>[] = [
  {
    accessorKey: "nomorInduk",
    header: "Nomor Induk",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("nomorInduk")}</div>
    ),
  },
  {
    accessorKey: "namaLengkap",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Lengkap
          <LuArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue("namaLengkap")}</div>
    ),
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("password")}</div>
    ),
  },
  {
    accessorKey: "gedung",
    header: "Gedung",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("gedung")}</div>
    ),
  },
  {
    accessorKey: "pembimbing",
    header: "Pembimbing",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("pembimbing")}</div>
    ),
  },
  {
    accessorKey: "mulaiMagang",
    header: "Mulai Magang",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("mulaiMagang")}</div>
    ),
  },
  {
    accessorKey: "selesaiMagang",
    header: "Selesai Magang",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("selesaiMagang")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <RiMoreFill />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <RiEdit2Line />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RiDeleteBin6Fill className='text-red-500' />
              <span className='text-red-500'>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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
    <Suspense fallback={<div>Loading supervisor</div>}>
      <div className='min-h-screen bg-gray-50 p-6'>
        <TablePageHeader
          title='Daftar Anak Magang'
          subtitle='List daftar anak magang aktif'
          label='Tambah User'
          onAdd={handleToggleModal}
        />
        <DataTable data={dataColumnIntern} columns={columns} />
        <CustomDialog
          open={open}
          onOpenChange={handleOpenChange}
          title='Tambah User'
          fields={internModalInput}
          onSubmit={handleSubmit}
        />
      </div>
    </Suspense>
  );
}