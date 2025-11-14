"use client";
import { AttendanceIntern } from "@/types/attendance";
import { columns } from "./today-intern-status/columns";
import { DataTable } from "./today-intern-status/data-table";

interface InternAttendanceTableProps {
  data: AttendanceIntern[];
}

export function InternAttendanceTable({ data }: InternAttendanceTableProps) {
  return (
    <div className='w-full'>
      <DataTable
        columns={columns}
        data={data}
        enableFilter={true}
        // enableColumnVisibility={false}
      />
    </div>
  );
}
