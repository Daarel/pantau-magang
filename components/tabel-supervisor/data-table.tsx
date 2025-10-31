"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-column-visibility";

// Props
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  enableFilter?: boolean;
  enableColumnVisibility?: boolean;
  filterMode?: "nama" | "keterangan" | "semua"; // 🆕 Tambahan prop
  title?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 5,
  enableFilter = true,
  enableColumnVisibility = true,
  filterMode = "semua", // default: tampilkan dua-duanya
  title,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [windowSize, setWindowSize] = React.useState(5);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setWindowSize(3);
      else if (window.innerWidth < 1024) setWindowSize(5);
      else setWindowSize(7);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  // 🔢 pagination calculations
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  let start = Math.max(currentPage - Math.floor(windowSize / 2), 0);
  const end = Math.min(start + windowSize, totalPages);
  if (end - start < windowSize) {
    start = Math.max(end - windowSize, 0);
  }
  const visiblePages = Array.from({ length: end - start }, (_, i) => i + start);

  return (
    <div>
      {title && <h5 className="h5 font-semibold mb-4">{title}</h5>}

      {/* 🔍 Filter dan Column Visibility */}
      {(enableFilter || enableColumnVisibility) && (
        <div className="flex flex-wrap gap-2 items-center pb-4">
          {enableFilter && (
            <>
              {/* 🆕 Filter berdasarkan Nama */}
              {(filterMode === "nama" || filterMode === "semua") && (
                <Input
                  placeholder="Filter berdasarkan nama"
                  value={
                    (table.getColumn("full_name")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("full_name")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm mt-4"
                />
              )}

              {/* 🔍 Filter berdasarkan Keterangan */}
              {(filterMode === "keterangan" || filterMode === "semua") && (
                <Input
                  placeholder="Filter berdasarkan keterangan"
                  value={
                    (table.getColumn("keterangan")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("keterangan")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm mt-4"
                />
              )}
            </>
          )}
          {enableColumnVisibility && <DataTableViewOptions table={table} />}
        </div>
      )}

      {/* 🧾 Tabel Data */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex items-center justify-center space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;
        </Button>

        {start > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
          >
            1...
          </Button>
        )}

        {visiblePages.map((i) => (
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(i)}
          >
            {i + 1}
          </Button>
        ))}

        {end < totalPages && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(totalPages - 1)}
          >
            ...{totalPages}
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
