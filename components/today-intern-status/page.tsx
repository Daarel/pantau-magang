import { columns } from "./columns"
import { DataTable } from "./data-table"
import { internAttendanceData } from "@/hooks/useAttendance"

export function InternAttendanceTable({ activeTab }: { activeTab: string }) {
  const { attendanceData, loading, error } = internAttendanceData(activeTab)

  if (loading) {
    return <div className="flex p-5 justify-center items-center">Loading...</div>
  }
  if (error) {
    return <div className="flex p-5 justify-center items-center">Error: {error}</div>
  }

  return (
    <div className="w-full">
      <DataTable 
        columns={columns} 
        data={attendanceData} 
        enableFilter={true}
        // enableColumnVisibility={false}
        // pageSize={5}
      />
    </div>
  )
}