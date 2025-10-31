"use client";

import { DataTable } from "@/components/tabel-supervisor/data-table";
import { historyColumns, History } from "@/components/tabel-supervisor/columns";
import DataTableHeader from "@/components/DataTableHeader";

export default function SupervisorHistoryClient({
  data,
}: {
  data: History[];
}) {
  return (
    <div className="w-full space-y-4">
      <DataTableHeader
        title="Histori Anak Magang"
        subtitle="List Anak Magang yang Pernah Diawasi"
      />
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
