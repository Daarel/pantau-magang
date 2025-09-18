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
import DataTable from "@/components/DataTable";
import CustomDialog from "@/components/CustomDialog";
import TablePageHeader from "@/components/DataTableHeader";
import { useModalQuery } from "@/hooks/useModalQuery";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AdminSupervisorProps {
  tableData: DataColumn[];
}

const AdminSupervisor: FC<AdminSupervisorProps> = ({ tableData }) => {
  const router = useRouter();
  const supabase = createClient();

  const { open, toggleModal, handleOpenChange } = useModalQuery("modal");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {};

  const deleteByNIM = useCallback(
    async (nomor_induk: number, onComplete?: () => void) => {
      setLoading(true);
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("nomor_induk", nomor_induk);

      setLoading(false);

      if (error) {
        console.error("Gagal hapus:", error.message);
      } else {
        console.log(`Data dengan NIM ${nomor_induk} berhasil dihapus`);
        if (onComplete) onComplete();
      }
    },
    [supabase]
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
        cell: ({ row }) => {
          const nomor_induk = row.original.nomor_induk;

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
                      deleteByNIM(nomor_induk, () => {
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
    [loading, deleteByNIM, router]
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
      <CustomDialog
        open={open}
        onOpenChange={handleOpenChange}
        title='Tambah Supervisor'
        fields={supervisorModalInput}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AdminSupervisor;
