"use client";

import DataTable from "@/components/DataTable";
import DataTableHeader from "@/components/DataTableHeader";
import { Button } from "@/components/ui/button";
import type { DataColumn } from "@/types/adminTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, type FC } from "react";
import { LuArrowUpDown } from "react-icons/lu";

interface AdminHistoryProps {
  tableData: DataColumn[];
}

const AdminHistory: FC<AdminHistoryProps> = ({ tableData }) => {
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
          <div>{row.getValue("action_type")}</div>
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
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              className='-m-3'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tanggal Aksi
              <LuArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("created_at")}</div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <DataTableHeader
        title='Histori perubahan'
        subtitle='List perubahan yang dilakukan oleh admin'
      />
      <DataTable data={tableData} columns={columns} />
    </>
  );
};

export default AdminHistory;
