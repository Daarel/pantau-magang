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
import { FC, useCallback, useMemo, useState } from "react";

import InsertSupervisorForm from "./InsertSupervisorForm";
import DataTable from "@/components/DataTable";
import { useModalQuery } from "@/hooks/useModalQuery";
import UpdateSupervisorForm from "./UpdateSupervisorForm";
import DataTableHeader from "@/components/DataTableHeader";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

interface AdminSupervisorProps {
  tableData: DataColumn[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  sort: string;
}

const AdminSupervisor: FC<AdminSupervisorProps> = ({
  tableData,
  totalCount,
  pageSize,
  currentPage,
  sort,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open: insertOpen, toggleModal: toggleInsert } =
    useModalQuery("modalInsert");
  const { open: editOpen, toggleModal: toggleEdit } =
    useModalQuery("modalEdit");
  const [loading, setLoading] = useState<boolean>(false);
  const [editData, setEditData] = useState<DataColumn | null>(null);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("sort", sort);
    router.push(`?${params.toString()}`);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleSortChange = useCallback(() => {
    const newSort = sort === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [router, searchParams, sort]);

  // 🗑️ DELETE
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
        toast.error("Gagal menghapus data supervisor");
      } else {
        if (onComplete) onComplete();
      }
    },
    []
  );

  // 📋 COLUMNS
  const columns = useMemo<ColumnDef<DataColumn>[]>(
    () => [
      {
        accessorKey: "nomor_induk",
        header: "Nomor Induk",
        cell: ({ row }) => <div>{row.getValue("nomor_induk")}</div>,
      },
      {
        accessorKey: "full_name",
        header: () => (
          <Button variant='ghost' className='-m-3' onClick={handleSortChange}>
            Nama Lengkap
            <LuArrowUpDown className={"ml-2"} />
          </Button>
        ),
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
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    deleteById(userData.id, () => {
                      router.refresh();
                    })
                  }
                  className='text-red-500 cursor-pointer hover:text-red-500'
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
    [loading, router, deleteById, toggleEdit, handleSortChange]
  );

  return (
    <>
      <DataTableHeader
        title='Daftar Supervisor'
        subtitle='List daftar supervisor aktif'
        label='Tambah Supervisor'
        onAdd={toggleInsert}
      />
      <DataTable
        data={tableData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNext}
        onPreviousPage={handlePrev}
        handlePageChange={handlePageChange}
      />
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
