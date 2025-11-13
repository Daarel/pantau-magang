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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { FaKey } from "react-icons/fa";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userDataRow, setUserDataRow] = useState<DataColumn | null>(null);

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
                  onSelect={() =>
                    router.push(`/admin/reset-password/${userData.nomor_induk}`)
                  }
                  className='cursor-pointer'
                >
                  <FaKey className='mr-2' />
                  Ubah Password
                </DropdownMenuItem>
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
                  onSelect={() => {
                    setUserDataRow(userData);
                    setOpenModal(true);
                  }}
                  className='text-red-500 cursor-pointer  hover:text-red-500'
                >
                  <RiDeleteBin6Fill className='mr-2 text-red-500  hover:text-red-500' />
                  {loading ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [loading, router, toggleEdit, handleSortChange]
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
        totalCount={totalCount}
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

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent
          showCloseButton={false}
          className='max-w-md rounded-2xl w-5/6'
        >
          <DialogHeader>
            <DialogTitle className='title__header'>
              Apakah Anda yakin ingin menghapus data?
            </DialogTitle>
            <div className='text-red-600 max-sm:text-xs text-sm'>
              <p className="max-w-[50ch]">
                Penghapusan data berdampak pada data akun di Table Attendance
                &amp; User yang terhapus secara permanen dari database.
              </p>
            </div>
          </DialogHeader>
          <DialogFooter className='flex flex-row justify-center items-center gap-3'>
            <DialogClose asChild>
              <button className='cursor-pointer px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors shadow-sm'>
                Batal
              </button>
            </DialogClose>
            <button
              onClick={() => {
                if (!userDataRow) return;
                deleteById(userDataRow.id, () => {
                  router.refresh();
                  setOpenModal(false);
                  toast.success(
                    `Data ${userDataRow.full_name} berhasil dihapus`
                  );
                });
              }}
              className='cursor-pointer px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-400 transition-all shadow-md'
            >
              Hapus
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminSupervisor;
