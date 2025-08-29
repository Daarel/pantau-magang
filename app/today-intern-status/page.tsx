import { columns, Attendance } from "./columns"
import { DataTable } from "./data-table"

function getData(): Attendance[] {
  // Fetch data from your API here.
  return [
    { 
      name: "Andi",
      institution: "Universitas Indonesia",
      status: "Present", 
      check_in_time: "08:00", 
      check_out_time: "08:00",
    },
    { 
      name: "Budi",
      institution: "ITB",
      status: "Present", 
      check_in_time: "08:05", 
      check_out_time: "08:05",
    },
    { 
      name: "Citra",
      institution: "Universitas Gadjah Mada",
      status: "Present", 
      check_in_time: "08:30", 
      check_out_time: "08:30",
    },
    { 
      name: "Dewi",
      institution: "Universitas Airlangga",
      status: "Present", 
      check_in_time: "08:10", 
      check_out_time: "08:10",
    },
    { 
      name: "Eka",
      institution: "Binus University",
      status: "Present", 
      check_in_time: "08:15", 
      check_out_time: "08:15",
    },
    { 
      name: "Fajar",
      institution: "Telkom University",
      status: "Permit", 
      check_in_time: "-", 
      check_out_time: "-" },

      { 
      name: "Gina",
      institution: "Universitas Padjadjaran",
      status: "Present", 
      check_in_time: "08:20", 
      check_out_time: "08:20",
    },
    { 
      name: "Hari",
      institution: "Universitas Diponegoro",
      status: "Present", 
      check_in_time: "08:25", 
      check_out_time: "08:25",
    },
    { 
      name: "Intan",
      institution: "UPH",
      status: "Absent", 
      check_in_time: "-", 
      check_out_time: "-" },

      { 
      name: "Joko",
      institution: "Universitas Brawijaya",
      status: "Late", 
      check_in_time: "08:40", 
      check_out_time: "08:40",
    },
  ]
}

export default function TablePage() {
  const data =  getData()

  return (
    <div className="w-full">
      <DataTable 
        columns={columns} 
        data={data} 
        enableFilter={false}
        enableColumnVisibility={false}
        // pageSize={5}
      />
    </div>
  )
}