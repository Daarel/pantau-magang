"use client";

import { LuArrowUpDown } from "react-icons/lu";
import { RiMoreFill, RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";
import InternFormDialog from "./InternFormDialog";

import type { DataColumn } from "@/types/adminTable";

import DataTable from "@/components/DataTable";
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
import { type FC, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUserProps {
  tableData: DataColumn[];
}

const AdminInternClient: FC<AdminUserProps> = ({ tableData }) => {
  const router = useRouter();

  const { open, toggleModal, handleOpenChange } = useModalQuery("modal");
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);

  const deleteById = useCallback(
    async (id: string, onComplete?: () => void) => {
      setLoadingDelete(true);

      const res = await fetch(`/api/deleteUser?id=${id}`, {
        method: "DELETE",
      });

      setLoadingDelete(false);

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

  async function updateById(user: DataColumn, onComplete?: () => void) {
    try {
      const res = await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal update user");
      }

      console.log("User berhasil diupdate:", data);
    } catch (err) {
      console.error(err);
    }
  }

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
                  <Button
                    variant={null}
                    onClick={() =>
                      updateById(user, () => {
                        console.log("done");
                        router.refresh();
                      })
                    }
                    disabled={loadingEdit}
                    >
                    {loadingEdit ? "Editing..." : "Edit"}
                  </Button>
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
                    disabled={loadingDelete}
                    className='text-red-500'
                  >
                    {loadingDelete ? "Deleting..." : "Delete"}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [ deleteById, loadingDelete, loadingEdit, router]
  );

  return (
    <>
      <TablePageHeader
        title='Daftar Anak Magang'
        subtitle='List daftar anak magang aktif'
        label='Tambah User'
        onAdd={toggleModal}
      />
      <div>
        <DataTable data={tableData} columns={columns} />
      </div>
      <InternFormDialog
        open={open}
        onOpenChange={handleOpenChange}
        title='Tambah User'
        fields={internModalInput}
      />
    </>
  );
};

export default AdminInternClient;
