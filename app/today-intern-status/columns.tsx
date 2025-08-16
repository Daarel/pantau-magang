"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { DataTableColumnHeader } from "@/components/data-table-column-header"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attendance = {
  name: string
  institution: string
  status: "Present" | "Late" | "Permit" | "Absent"
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
    accessorKey: "institution",
    // Sorting by institution name
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Institution" />
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