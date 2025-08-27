"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { RiMoreFill, RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// type Gedung = "Telematika" | "Arsip" | "Eksploitasi I" | "Forum Teknologi"; // comming soon.

// export type Column = {
//   id: string;
//   nomorInduk: number;
//   namaLengkap: string;
//   password: string;
//   gedung: Gedung;
//   pembimbing: string;
//   mulaiMagang: string;
//   selesaiMagang: string;
// };

// const data: Column[] = [
//   {
//     id: "m5gr84i9",
//     nomorInduk: 2022071064,
//     namaLengkap: "Daarel Safa Fatillah",
//     password: "daarel123",
//     gedung: "Telematika",
//     pembimbing: "Yasdi Pramesti",
//     mulaiMagang: "12-02-2024",
//     selesaiMagang: "12-04-2025",
//   },
//   {
//     id: "3u1reuv4",
//     nomorInduk: 2022071012,
//     namaLengkap: "Dika Arnanda Putra",
//     password: "dika123",
//     gedung: "Telematika",
//     pembimbing: "Yasdi Pramesti",
//     mulaiMagang: "12-02-2024",
//     selesaiMagang: "12-04-2025",
//   },
//   {
//     id: "derv1ws0",
//     nomorInduk: 2022071014,
//     namaLengkap: "Gregorius Rizcy Orlando Pradana",
//     password: "grego123",
//     gedung: "Telematika",
//     pembimbing: "Yasdi Pramesti",
//     mulaiMagang: "12-02-2024",
//     selesaiMagang: "12-04-2025",
//   },
//   {
//     id: "5kma53ae",
//     nomorInduk: 20324329223,
//     namaLengkap: "M Bagas",
//     password: "bagas123",
//     gedung: "Telematika",
//     pembimbing: "Yasdi Pramesti",
//     mulaiMagang: "12-02-2024",
//     selesaiMagang: "12-04-2025",
//   },
//   {
//     id: "bhqecj4p",
//     nomorInduk: 2022242342,
//     namaLengkap: "John Doe",
//     password: "john123",
//     gedung: "Telematika",
//     pembimbing: "Yasdi Pramesti",
//     mulaiMagang: "12-02-2024",
//     selesaiMagang: "12-04-2025",
//   },
// ];

// export const columns: ColumnDef<Column>[] = [
//   {
//     accessorKey: "nomorInduk",
//     header: "Nomor Induk",
//     cell: ({ row }) => (
//       <div className='capitalize'>{row.getValue("nomorInduk")}</div>
//     ),
//   },
//   {
//     accessorKey: "namaLengkap",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant='ghost'
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Nama Lengkap
//           <LuArrowUpDown />
//         </Button>
//       );
//     },
//     cell: ({ row }) => (
//       <div className='lowercase'>{row.getValue("namaLengkap")}</div>
//     ),
//   },
//   {
//     accessorKey: "password",
//     header: "Password",
//     cell: ({ row }) => (
//       <div className='capitalize'>{row.getValue("password")}</div>
//     ),
//   },
//   {
//     accessorKey: "gedung",
//     header: "Gedung",
//     cell: ({ row }) => (
//       <div className='capitalize'>{row.getValue("gedung")}</div>
//     ),
//   },
//   {
//     accessorKey: "pembimbing",
//     header: "Pembimbing",
//     cell: ({ row }) => (
//       <div className='capitalize'>{row.getValue("pembimbing")}</div>
//     ),
//   },
//   {
//     accessorKey: "mulaiMagang",
//     header: "Mulai Magang",
//     cell: ({ row }) => (
//       <div className='capitalize'>{row.getValue("mulaiMagang")}</div>
//     ),
//   },
//   {
//     accessorKey: "selesaiMagang",
//     header: "Selesai Magang",
//     cell: ({ row }) => (
//       <div className='capitalize'>{row.getValue("selesaiMagang")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: () => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant='ghost' className='h-8 w-8 p-0'>
//               <span className='sr-only'>Open menu</span>
//               <RiMoreFill />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align='end'>
//             <DropdownMenuItem>
//               <RiEdit2Line />
//               <span>Edit</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <RiDeleteBin6Fill className="text-red-500"/>
//               <span className="text-red-500">Delete</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter Nama...'
          value={
            (table.getColumn("namaLengkap")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("namaLengkap")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} dari{" "}
          {table.getFilteredRowModel().rows.length} baris terpilih.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
