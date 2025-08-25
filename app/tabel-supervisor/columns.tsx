"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table-column-header"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attendance = {
  name: string
  status: "Hadir" | "Sakit" | "Izin" | "Alfa"
  date: string
  location: string
  check_in_time: string
  check_out_time: string
}

// Header name
export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Name" />
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Status" />
      )
    },
    // Tambahkan cell rendering dengan styling kondisional
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      // Tentukan kelas CSS berdasarkan status
      let statusClass = "";
      switch (status) {
        case "Hadir":
          statusClass = "bg-green-100 text-green-800";
          break;
        case "Sakit":
          statusClass = "bg-yellow-100 text-yellow-800";
          break;
        case "Izin":
          statusClass = "bg-blue-100 text-blue-800";
          break;
        case "Alfa":
          statusClass = "bg-red-100 text-red-800";
          break;
        default:
          statusClass = "bg-gray-100 text-gray-800";
      }
      
      return (
        <div className={`w-full py-1 rounded-full text-center font-medium ${statusClass}`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    // Sorting by institution name
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date" />
      )
    },
  },
  {
    accessorKey: "location",
    // Sorting by institution name
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Location" />
      )
    },
  },
  {
    accessorKey: "check_in_time",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Check In" />
      )
    },
  },
  {
    accessorKey: "check_out_time",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Check Out" />
      )
    },
  },
]