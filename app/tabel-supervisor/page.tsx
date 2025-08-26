
import { columns, Attendance } from "./columns"
import { DataTable } from "./data-table"

function getData(): Attendance[] {
  // Fetch data from your API here.
  return [
    { 
      name: "Andi",
      status: "Hadir",
      location: "-6.237768730275225, 106.76718123226024",
      date: "2024-06-01", 
      check_in_time: "08:00", 
      check_out_time: "08:00",
    },
    { 
      name: "Budi",
      status: "Hadir", 
      location: "-6.237768730275225, 106.76718123226024",
      date: "2024-06-01",   
      check_in_time: "08:05", 
      check_out_time: "08:05",
    },
    { 
      name: "Citra",
      status: "Hadir",
      location: "-6.237768730275225, 106.76718123226024",
      date: "2024-06-01",  
      check_in_time: "08:30", 
      check_out_time: "08:30",
    },
    { 
      name: "Dewi",
      status: "Hadir", 
      location: "-6.237768730275225, 106.76718123226024",
      date: "2024-06-01", 
      check_in_time: "08:10", 
      check_out_time: "08:10",
    },
    { 
      name: "Eka",
      status: "Hadir", 
      location: "-6.237768730275225, 106.76718123226024",
      date: "2024-06-01", 
      check_in_time: "08:15", 
      check_out_time: "08:15",
    },
    { 
      name: "Fajar",
      status: "Sakit", 
      location: "N/a",
      date: "2024-06-01", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

      { 
      name: "Gina",
      status: "Hadir", 
      location: "-6.237768730275225, 106.76718123226024",
      date: "2024-06-01", 
      check_in_time: "08:20", 
      check_out_time: "08:20",
    },
    { 
      name: "Hari",
      status: "Hadir",
      location: "-6.237768730275225, 106.76718123226024",
      date: "2024-06-01",  
      check_in_time: "08:25", 
      check_out_time: "08:25",
    },
    { 
      name: "Intan",
      status: "Alfa", 
      location: "N/a",
      date: "2024-06-01", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

      { 
      name: "Joko",
      status: "Izin",
      location: "N/a",
      date: "2024-06-01",  
      check_in_time: "-:-", 
      check_out_time: "-:-",
    },

    { 
      name: "Ucok",
      status: "Alfa", 
      location: "N/a",
      date: "2024-06-04", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

    { 
      name: "Abeng",
      status: "Sakit", 
      location: "N/a",
      date: "2024-06-05", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },
  ]
}

interface TablePageProps {
  activeTab: string;
}

export default function TablePage({ activeTab }: TablePageProps) {
  const data = getData()

// Filter sesuai tab aktif
  const filteredData =
    activeTab === "Semua Daftar"
      ? data
      : data.filter((item) => item.status === activeTab)

  return (
    <div className="w-full">
      <DataTable 
        columns={columns} 
        data={filteredData} 
        enableFilter={false}
        enableColumnVisibility={false}
        // pageSize={5}
      />
    </div>
  )
}