import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AttendanceIntern } from "../../types/attendance"
import data from "../../const/intern_dummyData.json"

export function InternAttendanceTable({ activeTab }: { activeTab: string }) {
  const attendanceDataIntern: AttendanceIntern[] = data as AttendanceIntern[]

  // Filter data sesuai tab
  const filteredData =
    activeTab === "Semua Riwayat"
      ? attendanceDataIntern
      : attendanceDataIntern.filter((item) => item.status === activeTab)
  return (
    <div className="w-full">
      <DataTable 
        columns={columns} 
        data={filteredData} 
        enableFilter={true}
        // enableColumnVisibility={false}
        // pageSize={5}
      />
    </div>
  )
}