"use client";

import { type FC } from "react";

import { LuArrowUpDown } from "react-icons/lu";
import { RiMoreFill, RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";

import type { DataColumn } from "@/types/adminTable";

import DataTable from "@/components/DataTable";
import CustomDialog from "@/components/CustomDialog";
import TablePageHeader from "@/components/DataTableHeader";
import { internModalInput } from "@/const";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
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
    accessorKey: "supervisor_name",
    header: "Pembimbing",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("supervisor_name")}</div>
    ),
  },
  {
    accessorKey: "intern_start_date",
    header: "Mulai Magang",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("intern_start_date")}</div>
    ),
  },
  {
    accessorKey: "intern_end_date",
    header: "Selesai Magang",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("intern_end_date")}</div>
    ),
  },
  {
    accessorKey: "institution",
    header: "Asal Sekolah/Universitas",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("institution")}</div>
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

interface AdminUserProps {
  tableData: DataColumn[];
}

const AdminUser: FC<AdminUserProps> = ({tableData}) => {
  const { open, toggleModal, handleOpenChange } = useModalQuery("modal");

  const handleSubmit = () => {};

  return (
    <>
      <TablePageHeader
        title='Daftar Anak Magang'
        subtitle='List daftar anak magang aktif'
        label='Tambah User'
        onAdd={toggleModal}
      />
      <DataTable data={tableData} columns={columns} />
      <CustomDialog
        open={open}
        onOpenChange={handleOpenChange}
        title='Tambah User'
        fields={internModalInput}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AdminUser;