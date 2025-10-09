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
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { type FC, useCallback, useMemo, useState } from "react";

import InsertSupervisorForm from "./InsertSupervisorForm";
import DataTable from "@/components/DataTable";
import { useModalQuery } from "@/hooks/useModalQuery";
import { useRouter } from "next/navigation";
import UpdateSupervisorForm from "./UpdateSupervisorForm";
import DataTableHeader from "@/components/DataTableHeader";
import { toast } from "sonner";

interface AdminSupervisorProps {
  tableData: DataColumn[];
}

const AdminSupervisor: FC<AdminSupervisorProps> = ({ tableData }) => {
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

      const res = await fetch("/api/supervisor", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setLoading(false);

      if (!res.ok) {
        const err = await res.json();
        console.error("Gagal menghapus: ", err.error);
        toast.error("Gagal menghapus data supervisor")
      } else {
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div>{row.getValue("status")}</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
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
                  {/* <RiEdit2Line />
                  <Button onClick={() => {
                      setEditData(userData);
                      toggleEdit();
                    }} variant={null}>
                    Edit
                  </Button> */}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    deleteById(userData.id, () => {
                      router.refresh();
                    })
                  }
                  className='text-red-500 cursor-pointer  hover:text-red-500'
                >
                  <RiDeleteBin6Fill className='mr-2 text-red-500 hover:text-red-500' />
                  {loading ? "Deleting..." : "Delete"}
                  {/* <RiDeleteBin6Fill className='text-red-500' />
                  <Button
                    variant={null}
                    onClick={() =>
                      deleteById(id, () => {
                        router.refresh();
                      })
                    }
                    disabled={loading}
                    className='text-red-500'
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </Button> */}
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
      <DataTableHeader
        title='Daftar Supervisor'
        subtitle='List daftar supervisor aktif'
        label='Tambah Supervisor'
        onAdd={toggleInsert}
      />
      <DataTable data={tableData} columns={columns} />
      <InsertSupervisorForm open={insertOpen} onOpenChange={toggleInsert} />
      <UpdateSupervisorForm
        open={editOpen}
        onOpenChange={toggleEdit}
        defaultData={editData}
      />
    </>
  );
};

export default AdminSupervisor;
