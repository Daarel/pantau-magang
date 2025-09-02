"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { AttendanceIntern } from "@/types/attendance"
import { formatDate, formatTime, truncateText, statusColor } from "@/lib/utils"

// Header name
export const columns: ColumnDef<AttendanceIntern>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Status" />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusInfo = statusColor(status);
      return (
      <div className={`w-full py-1 rounded-full text-center font-medium ${statusInfo.class}`}>
        {statusInfo.text}
      </div>
    );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Tanggal" />
      )
    },
    cell: ({ row }) => {
      const dateString = row.getValue("date") as string;
      return <div>{formatDate(dateString)}</div>;
    },
  },
  {
    accessorKey: "notes",
    // Sorting by institution name
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Keterangan" />
      )
    },
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string;
      return <div title={notes}>{truncateText(notes, 15)}</div>;
    },
  },
  {
    accessorKey: "check_in_time",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Masuk" />
      )
    },
    cell: ({ row }) => {
      const checkInTime = row.getValue("check_in_time") as string | null;
      return <div>{formatTime(checkInTime)}</div>;
    },
  },
  {
    accessorKey: "check_out_time",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Pulang" />
      )
    },
    cell: ({ row }) => {
      const checkOutTime = row.getValue("check_out_time") as string | null;
      return <div>{formatTime(checkOutTime)}</div>;
    },
  },
  {
    accessorKey: "file_url",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Lampiran" />
      )
    },
    cell: ({ row }) => {
      const fileUrl = row.getValue("file_url") as string;
      return (
        <div>
          {fileUrl && fileUrl !== "-" ? (
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Lihat
            </a>
          ) : (
            "-"
          )}
        </div>
      )
    },
  },
]