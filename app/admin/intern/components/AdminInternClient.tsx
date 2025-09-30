"use client";

import { LuArrowUpDown } from "react-icons/lu";
import { RiMoreFill, RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";
import InsertInternForm from "./InsertInternForm";
import type { DataColumn } from "@/types/adminTable";

import DataTable from "@/components/DataTable";
import TablePageHeader from "@/components/DataTableHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { useModalQuery } from "@/hooks/useModalQuery";
import { type FC, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import UpdateInternForm from "./UpdateInternForm";

interface AdminUserProps {
  tableData: DataColumn[];
}

const AdminInternClient: FC<AdminUserProps> = ({ tableData }) => {
  const router = useRouter();

  const { open: insertOpen, toggleModal: toggleInsert } =
    useModalQuery("modalInsert");
  const { open: editOpen, toggleModal: toggleEdit } =
    useModalQuery("modalEdit");
  const [loading, setLoading] = useState<boolean>(false);
  const [editData, setEditData] = useState<DataColumn | null>(null);

  const deleteById = useCallback(
    async (id: string, onComplete?: () => void) => {
      setLoading(true);

      const res = await fetch("/api/intern", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setLoading(false);

      if (!res.ok) {
        const err = await res.json();
        console.error("Gagal menghapus: ", err.error);
      } else {
        console.log("User berhasil dihapus");
        if (onComplete) onComplete();
      }
    },
    []
  );

  const columns = useMemo<ColumnDef<DataColumn>[]>(
    () => [
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
              className='-m-3'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nama Lengkap
              <LuArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("full_name")}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className='lowercase'>{row.getValue("email")}</div>
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
        accessorKey: "institution",
        header: "Perguruan Tinggi",
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("institution")}</div>
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const id = row.original.id;
          const userData = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <RiMoreFill />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onSelect={() => {
                    setEditData(userData);
                    toggleEdit();
                  }}
                  className='cursor-pointer'
                >
                  <RiEdit2Line className='mr-2' />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    deleteById(id, () => {
                      router.refresh();
                    })
                  }
                  className='text-red-500 cursor-pointer'
                >
                  <RiDeleteBin6Fill className='mr-2 text-red-500' />
                  {loading ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [loading, deleteById, router, toggleEdit]
  );

  return (
    <>
      <TablePageHeader
        title='Daftar Anak Magang'
        subtitle='List daftar anak magang aktif'
        label='Tambah User'
        onAdd={toggleInsert}
      />
      <DataTable data={tableData} columns={columns} />
      <InsertInternForm open={insertOpen} onOpenChange={toggleInsert} />
      <UpdateInternForm
        open={editOpen}
        onOpenChange={toggleEdit}
        defaultData={editData}
      />
    </>
  );
};

export default AdminInternClient;
