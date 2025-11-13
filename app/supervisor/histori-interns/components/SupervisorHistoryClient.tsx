"use client";

import { DataTable } from "@/components/tabel-supervisor/data-table";
import { historyColumns, History } from "@/components/tabel-supervisor/columns";
import DataTableHeader from "@/components/DataTableHeader";
import StartAttendanceButton from "./startbutton";

export default function SupervisorHistoryClient({ data }: { data: History[] }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <DataTableHeader
          title="Histori Anak Magang"
          subtitle="List Anak Magang yang Pernah Diawasi"
        />
        <StartAttendanceButton />
      </div>
      <div className="flex-col border-2 rounded-lg p-2">
        <DataTable
          columns={historyColumns}
          data={data}
          enableFilter={true}
          enableColumnVisibility={false}
          filterMode="nama"
        />
      </div>
    </div>
  );
}
