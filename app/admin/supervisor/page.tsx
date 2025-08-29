"use client";

import { LuArrowUpDown } from "react-icons/lu";
import { RiMoreFill, RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";
import { dataColumnSupervisor, type DataColumn } from "@/const/dummy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { supervisorModalInput } from "@/const";
import DataTable from "@/components/DataTable";
import CustomDialog from "@/components/CustomDialog";
import TablePageHeader from "@/components/DataTableHeader";

export const columns: ColumnDef<DataColumn>[] = [
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

export default function AdminSupervisor() {
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
    <>
      <div className='min-h-screen bg-gray-50 p-6'>
        <TablePageHeader
          title='Daftar Supervisor'
          subtitle='List daftar supervisor aktif'
          label='Tambah Supervisor'
          onAdd={handleToggleModal}
        />
        <DataTable data={dataColumnSupervisor} columns={columns} />
        <CustomDialog
          open={open}
          onOpenChange={handleOpenChange}
          title='Tambah Supervisor'
          fields={supervisorModalInput}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
