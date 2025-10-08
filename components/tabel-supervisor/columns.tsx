"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiSolidCheckCircle } from "react-icons/bi";
import { BiSolidXCircle } from "react-icons/bi";
import { createClient } from "@/lib/supabase/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attendance = {
  id(arg0: string, id: any): { error: any } | PromiseLike<{ error: any }>;
  name: string;
  status: string;
  date: string;
  keterangan?: string;
  check_in_time: string;
};
export type Report = {
  id(arg0: string, id: any): { error: any } | PromiseLike<{ error: any }>;
  file?: string;
  name: string;
  status: "Sakit" | "Izin";
  keterangan?: string;
};
export type Dashboard = {
  name: string;
  status: string;
  institutions: string;
  check_in_time: string;
  file?: string;
};

const supabase = createClient();

// Header name
export const columns = (
  onActionComplete: () => void
): ColumnDef<Attendance>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nama" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    // Tambahkan cell rendering dengan styling kondisional
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase();

      // Tentukan kelas CSS berdasarkan status
      let statusClass = "";
      switch (status) {
        case "hadir":
          statusClass = "bg-green-100 text-green-800";
          break;
        case "sakit":
          statusClass = "bg-yellow-100 text-yellow-800";
          break;
        case "izin":
          statusClass = "bg-blue-100 text-blue-800";
          break;
        case "alfa":
          statusClass = "bg-red-100 text-red-800";
          break;
        default:
          statusClass = "bg-gray-100 text-gray-800";
      }

      return (
        <div
          className={`w-full py-1 rounded-full text-center font-medium ${statusClass}`}
        >
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    // Sorting by institution name
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tanggal" />;
    },
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
  },
  {
    accessorKey: "check_in_time",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Masuk" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const handleUpdateStatus = async (newStatus: string) => {
        try {
          const updateData: any = { status: newStatus };

          // kalau dari izin/sakit jadi hadir → isi check_in_time
          if (newStatus.toLowerCase() === "hadir") {
            if (
              row.original.status.toLowerCase() === "izin" ||
              row.original.status.toLowerCase() === "sakit"
            ) {
              updateData.check_in_time = new Date().toISOString();
            }
          } else {
            // kalau status bukan hadir, hapus check_in_time
            updateData.check_in_time = null;
          }

          const { error } = await supabase
            .from("attendance")
            .update(updateData)
            .eq("id", row.original.id);

          if (error) {
            console.error("Gagal update status:", error);
          } else {
            console.log(`Status updated to ${newStatus} for`, row.original);

            // update UI langsung
            row.original.status = newStatus;
            if (updateData.check_in_time) {
              row.original.check_in_time = updateData.check_in_time;
            }
            onActionComplete();
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
              <FiMoreHorizontal className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus("hadir")}
              className="cursor-pointer bg-green-100 text-green-800 w-full py-1 rounded-full flex justify-center font-medium mb-1"
            >
              Hadir
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus("sakit")}
              className="cursor-pointer bg-yellow-100 text-yellow-800 w-full py-1 rounded-full flex justify-center font-medium mb-1"
            >
              Sakit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus("izin")}
              className="cursor-pointer bg-blue-100 text-blue-800 w-full py-1 rounded-full flex justify-center font-medium mb-1"
            >
              Izin
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus("alfa")}
              className="cursor-pointer bg-red-100 text-red-800 w-full py-1 rounded-full flex justify-center font-medium mb-1"
            >
              Alfa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 👉 Columns khusus untuk Reports Page
export const reportColumns = (
  onActionComplete: () => void
): ColumnDef<Report>[] => [
  {
    accessorKey: "file",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lampiran" />
    ),
    cell: ({ row }) => {
      const file = row.getValue("file") as string | undefined;
      const fullName = row.original.name as string | undefined;

      if (!file) {
        return <span className="text-gray-400">-</span>;
      }

      // ambil hanya nama file (tanpa path)
      const fileName = file.split("/").pop() || file;
      const extension = fileName.includes(".")
        ? fileName.split(".").pop()?.toUpperCase()
        : "";

      return (
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {fullName ? `${fullName}.${extension}` : fileName}
        </a>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      // Tentukan kelas CSS berdasarkan status
      let statusClass = "";
      switch (status) {
        case "Sakit":
          statusClass = "bg-yellow-100 text-yellow-800";
          break;
        case "Izin":
          statusClass = "bg-blue-100 text-blue-800";
          break;
        default:
          statusClass = "bg-gray-100 text-gray-800";
      }

      return (
        <div
          className={`w-full py-1 rounded-full text-center font-medium ${statusClass}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <FiMoreHorizontal className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={async () => {
              const { error } = await supabase
                .from("attendance")
                .update({ dispensation: "approved" })
                .eq("id", row.original.id); // pastikan id ikut di-select!

              if (error) {
                console.error("Error approving:", error);
              } else {
                console.log("Approved:", row.original);
                // TODO: trigger refresh data
                onActionComplete();
              }
            }}
            className="cursor-pointer"
          >
            <BiSolidCheckCircle className="mr-2 h-4 w-4 text-green-600" />
            Setuju
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const { error } = await supabase
                .from("attendance")
                .update({
                  status: "alfa", // ubah status jadi Alfa
                  dispensation: "n_approved", // ubah pending jadi n_approved
                })
                .eq("id", row.original.id);

              if (error) {
                console.error("Error rejecting:", error);
              } else {
                console.log("Rejected:", row.original);
                // TODO: trigger refresh data kalau mau auto update
                onActionComplete();
              }
            }}
            className="cursor-pointer"
          >
            <BiSolidXCircle className="mr-2 h-4 w-4 text-red-600" />
            Tolak
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export const Dashboardcolumns: ColumnDef<Dashboard>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nama" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    // Tambahkan cell rendering dengan styling kondisional
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase();

      // Tentukan kelas CSS berdasarkan status
      let statusClass = "";
      switch (status) {
        case "hadir":
          statusClass = "bg-green-100 text-green-800";
          break;
        case "sakit":
          statusClass = "bg-yellow-100 text-yellow-800";
          break;
        case "izin":
          statusClass = "bg-blue-100 text-blue-800";
          break;
        case "alfa":
          statusClass = "bg-red-100 text-red-800";
          break;
        default:
          statusClass = "bg-gray-100 text-gray-800";
      }

      return (
        <div
          className={`w-full py-1 rounded-full text-center font-medium ${statusClass}`}
        >
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "institutions",
    // Sorting by institution name
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Sekolah/Universitas" />
      );
    },
  },
  {
    accessorKey: "check_in_time",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Masuk" />;
    },
  },
  {
    accessorKey: "file",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lampiran" />
    ),
    cell: ({ row }) => {
      const file = row.getValue("file") as string | undefined;
      const fullName = row.original.name as string | undefined;

      if (!file) {
        return <span className="text-gray-400">-</span>;
      }

      // ambil hanya nama file (tanpa path)
      const fileName = file.split("/").pop() || file;
      const extension = fileName.includes(".")
        ? fileName.split(".").pop()?.toUpperCase()
        : "";

      return (
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {fullName ? `${fullName}.${extension}` : fileName}
        </a>
      );
    },
  },
];
