"use client";

import { LuArrowUpDown } from "react-icons/lu";
import { RiMoreFill, RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";
import type { DataColumn } from "@/types/adminTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { FC, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { supervisorModalInput } from "@/const";
import DataTable from "@/components/DataTable";
import CustomDialog from "@/components/CustomDialog";
import TablePageHeader from "@/components/DataTableHeader";

const columns: ColumnDef<DataColumn>[] = [
  {
    accessorKey: "nomor_induk",
    header: "Nomor Induk",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("nomor_induk")}</div>
    ),
  },
  {
    accessorKey: "full_name",
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
      <div className='lowercase'>{row.getValue("full_name")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: "Gedung",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("department")}</div>
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

interface AdminSupervisorProps {
  tableData: DataColumn[];
}

const AdminSupervisor: FC<AdminSupervisorProps> = ({tableData}) => {
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
      <TablePageHeader
        title='Daftar Supervisor'
        subtitle='List daftar supervisor aktif'
        label='Tambah Supervisor'
        onAdd={handleToggleModal}
      />
      <DataTable data={tableData} columns={columns} />
      <CustomDialog
        open={open}
        onOpenChange={handleOpenChange}
        title='Tambah Supervisor'
        fields={supervisorModalInput}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AdminSupervisor;