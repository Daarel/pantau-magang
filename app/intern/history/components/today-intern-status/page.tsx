"use client";
import { AttendanceIntern } from "@/types/attendance";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
        // pageSize={5}
      />
    </div>
  );
}
