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

import { type FC, useCallback, useMemo, useState } from "react";

import { supervisorModalInput } from "@/const";
import SupervisorFormDialog from "./SupervisorFormDialog";
import DataTable from "@/components/DataTable";
import TablePageHeader from "@/components/DataTableHeader";
import { useModalQuery } from "@/hooks/useModalQuery";
import { useRouter } from "next/navigation";

interface AdminSupervisorProps {
  tableData: DataColumn[];
}

const AdminSupervisor: FC<AdminSupervisorProps> = ({ tableData }) => {
  const router = useRouter();

  const { open, toggleModal, handleOpenChange } = useModalQuery("modal");
  const [loading, setLoading] = useState<boolean>(false);

  const deleteById = useCallback(
    async (id: string, onComplete?: () => void) => {
      setLoading(true);

      const res = await fetch("/api/deleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setLoading(false);

      if (!res.ok) {
        const err = await res.json();
        console.error("Gagal menghapus: ", err.error);
      } else {
        console.log("User berhasil dihapus.");
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
        cell: ({ row }) => <div>{row.getValue("nomor_induk")}</div>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className='lowercase'>{row.getValue("email")}</div>
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
        accessorKey: "department",
        header: "Gedung",
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("department")}</div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const id = row.original.id;

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
                  <Button variant={null}>Edit</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RiDeleteBin6Fill className='text-red-500' />
                  <Button
                    variant={null}
                    onClick={() =>
                      deleteById(id, () => {
                        console.log("done");
                        router.refresh();
                      })
                    }
                    disabled={loading}
                    className='text-red-500'
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [loading, deleteById, router]
  );

  return (
    <>
      <TablePageHeader
        title='Daftar Supervisor'
        subtitle='List daftar supervisor aktif'
        label='Tambah Supervisor'
        onAdd={toggleModal}
      />
      <DataTable data={tableData} columns={columns} />
      <SupervisorFormDialog
        open={open}
        onOpenChange={handleOpenChange}
        title='Tambah User'
        fields={supervisorModalInput}
      />
    </>
  );
};

export default AdminSupervisor;
