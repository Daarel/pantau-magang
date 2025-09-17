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
import { useModalQuery } from "@/hooks/useModalQuery";

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
  const { open, toggleModal, handleOpenChange } = useModalQuery("modal");

  const handleSubmit = () => {};

  return (
    <>
      <TablePageHeader
        title='Daftar Supervisor'
        subtitle='List daftar supervisor aktif'
        label='Tambah Supervisor'
        onAdd={toggleModal}
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