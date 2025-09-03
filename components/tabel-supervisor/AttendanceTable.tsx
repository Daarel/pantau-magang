
import { columns, reportColumns, Dashboardcolumns, Attendance, Report, Dashboard} from "./columns"
import { DataTable } from "./data-table"

function getData(): Attendance[] {
  // Fetch data from your API here.
  return [
    { 
      name: "Andi",
      status: "Hadir",
      keterangan: "-",
      date: "2024-06-01", 
      check_in_time: "08:00", 
      check_out_time: "08:00",
    },
    { 
      name: "Budi",
      status: "Hadir", 
      keterangan: "-",
      date: "2024-06-01",   
      check_in_time: "08:05", 
      check_out_time: "08:05",
    },
    { 
      name: "Citra",
      status: "Hadir",
      keterangan: "-",
      date: "2024-06-01",  
      check_in_time: "08:30", 
      check_out_time: "08:30",
    },
    { 
      name: "Dewi",
      status: "Hadir", 
      keterangan: "-",
      date: "2024-06-01", 
      check_in_time: "08:10", 
      check_out_time: "08:10",
    },
    { 
      name: "Eka",
      status: "Hadir", 
      keterangan: "-",
      date: "2024-06-01", 
      check_in_time: "08:15", 
      check_out_time: "08:15",
    },
    { 
      name: "Fajar",
      status: "Sakit", 
      keterangan: "-",
      date: "2024-06-01", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

      { 
      name: "Gina",
      status: "Hadir", 
      keterangan: "-",
      date: "2024-06-01", 
      check_in_time: "08:20", 
      check_out_time: "08:20",
    },
    { 
      name: "Hari",
      status: "Hadir",
      keterangan: "-",
      date: "2024-06-01",  
      check_in_time: "08:25", 
      check_out_time: "08:25",
    },
    { 
      name: "Intan",
      status: "Alfa", 
      keterangan: "-",
      date: "2024-06-01", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

      { 
      name: "Joko",
      status: "Izin",
      keterangan: "-",
      date: "2024-06-01",  
      check_in_time: "-:-", 
      check_out_time: "-:-",
    },

    { 
      name: "Ucok",
      status: "Alfa", 
      keterangan: "-",
      date: "2024-06-04", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

    { 
      name: "Abeng",
      status: "Sakit", 
      keterangan: "-",
      date: "2024-06-05", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

  ]
}

function getReportData(): Report[] {
  // Fetch data from your API here.
  return [
    { 
      file: "report_andi.pdf",
      name: "Andi",
      status: "Izin",
      keterangan: "Izin ke kampus",
    },

    { 
      file: "report_sandi.pdf",
      name: "Sandi",
      status: "Sakit",
      keterangan: "Izin Sakit",
    },

    { 
      file: "report_andi.pdf",
      name: "Andi",
      status: "Sakit",
      keterangan: "Masih Sakit",
    },

    { 
      file: "report_sandi.pdf",
      name: "Sandi",
      status: "Sakit",
      keterangan: "Ketularan Sakit",
    },

    { 
      file: "report_dono.pdf",
      name: "Dono",
      status: "Izin",
      keterangan: "Main ke luar kota",
    },

    { 
      file: "report_dono.pdf",
      name: "Dono",
      status: "Sakit",
      keterangan: "Demam tinggi",
    },

    { 
      file: "report_sandi.pdf",
      name: "Sandi",
      status: "Izin",
      keterangan: "Tidak ada keterangan",
    },

    { 
      file: "report_vior.pdf",
      name: "Vior",
      status: "Izin",
      keterangan: "Nikah",
    },
  ]

}

function getDashboardData(): Dashboard[] {
  // Fetch data from your API here.
  return [
    { 
      name: "Andi",
      status: "Hadir",
      institutions: "UPJ", 
      check_in_time: "08:00", 
      check_out_time: "08:00",
    },
    { 
      name: "Budi",
      status: "Hadir", 
      institutions: "UPJ", 
      check_in_time: "08:05", 
      check_out_time: "08:05",
    },
    { 
      name: "Citra",
      status: "Hadir",
      institutions: "UPJ",  
      check_in_time: "08:30", 
      check_out_time: "08:30",
    },
    { 
      name: "Dewi",
      status: "Hadir", 
      institutions: "UPJ", 
      check_in_time: "08:10", 
      check_out_time: "08:10",
    },
    { 
      name: "Eka",
      status: "Hadir", 
      institutions: "UPJ", 
      check_in_time: "08:15", 
      check_out_time: "08:15",
    },
    { 
      name: "Fajar",
      status: "Sakit", 
      institutions: "UPH",
      check_in_time: "-:-", 
      check_out_time: "-:-" },

      { 
      name: "Gina",
      status: "Hadir", 
      institutions: "UNPAM", 
      check_in_time: "08:20", 
      check_out_time: "08:20",
    },
    { 
      name: "Hari",
      status: "Hadir",
      institutions: "UNTIRTA",  
      check_in_time: "08:25", 
      check_out_time: "08:25",
    },
    { 
      name: "Intan",
      status: "Alfa", 
      institutions: "UPH", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

      { 
      name: "Joko",
      status: "Izin",
      institutions: "UNPAM",  
      check_in_time: "-:-", 
      check_out_time: "-:-",
    },

    { 
      name: "Ucok",
      status: "Alfa", 
      institutions: "UBL", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

    { 
      name: "Abeng",
      status: "Sakit", 
      institutions: "UBL", 
      check_in_time: "-:-", 
      check_out_time: "-:-" },

  ]
}

export function AttendanceTable({ activeTab }: { activeTab: string }) {
  const attendanceData = getData()

  // Filter data sesuai tab
  const filteredData =
    activeTab === "Semua Daftar"
      ? attendanceData
      : attendanceData.filter((item) => item.status === activeTab)

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={filteredData}
        enableFilter={false}
        enableColumnVisibility={false}
      />
    </div>
  )
}

// Komponen khusus Report
export function ReportTable({ activeTab }: { activeTab: string }) {
  const reportData = getReportData()

    // Filter data sesuai tab
  const filteredData =
    activeTab === "Semua Daftar"
      ? reportData
      : reportData.filter((item) => item.status === activeTab)

  return (
    <div className="w-full">
      <DataTable
        columns={reportColumns}
        data={filteredData}
        enableFilter={false}
        enableColumnVisibility={false}
      />
    </div>
  )
}

export function DashboardTable() {
  const reportData = getDashboardData()

  return (
    <div className="w-full">
      <DataTable
        columns={Dashboardcolumns}
        data={reportData}
        enableFilter={false}
        enableColumnVisibility={false}
      />
    </div>
  )
}
