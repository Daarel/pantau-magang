import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AttendanceIntern } from "../../types/attendance"
import data from "../../const/intern_dummyData.json"

export default function TablePage() {
  const attendanceData: AttendanceIntern[] = data as AttendanceIntern[]

  return (
    <div className="w-full">
      <DataTable 
        columns={columns} 
        data={attendanceData} 
        enableFilter={false}
        enableColumnVisibility={false}
        // pageSize={5}
      />
    </div>
  )
}