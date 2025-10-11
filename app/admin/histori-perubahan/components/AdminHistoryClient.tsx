"use client";

import DataTable from "@/components/DataTable";
import DataTableHeader from "@/components/DataTableHeader";
import { Button } from "@/components/ui/button";
import type { DataColumn } from "@/types/adminTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, type FC } from "react";
import { LuArrowUpDown } from "react-icons/lu";

interface AdminHistoryProps {
  tableData: DataColumn[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  sort: string;
}

const AdminHistory: FC<AdminHistoryProps> = ({
  tableData,
  totalCount,
  pageSize,
  currentPage,
  sort,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const columns = useMemo<ColumnDef<DataColumn>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: "Admin",
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("full_name")}</div>
        ),
      },
      {
        accessorKey: "action_type",
        header: "Tipe aksi",
        cell: ({ row }) => (
          <div className='lowercase'>{row.getValue("action_type")}</div>
        ),
      },
      {
        accessorKey: "description",
        header: "Keterangan",
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("description")}</div>
        ),
      },
      {
        accessorKey: "target_name",
        header: "Nama target",
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("target_name")}</div>
        ),
      },
      {
        accessorKey: "created_at",
        header: () => (
          <Button variant='ghost' className='-m-3' onClick={handleSortChange}>
            Nama Lengkap
            <LuArrowUpDown
              className={`ml-2 transition-transform ${
                sort === "desc" ? "rotate-180" : ""
              }`}
            />
          </Button>
        ),
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("created_at")}</div>
        ),
      },
    ],
    [handleSortChange, sort]
  );

  return (
    <>
      <DataTableHeader
        title='Histori perubahan'
        subtitle='List perubahan yang dilakukan oleh admin'
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
    </>
  );
};

export default AdminHistory;
