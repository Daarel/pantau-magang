
// import { columns, reportColumns, Attendance, Report} from "./columns"
// import { DataTable } from "./data-table"

// function getData(): Attendance[] {
//   // Fetch data from your API here.
//   return [
//     { 
//       name: "Andi",
//       status: "Hadir",
//       keterangan: "-",
//       date: "2024-06-01", 
//       check_in_time: "08:00", 
//       check_out_time: "08:00",
//     },
//     { 
//       name: "Budi",
//       status: "Hadir", 
//       keterangan: "-",
//       date: "2024-06-01",   
//       check_in_time: "08:05", 
//       check_out_time: "08:05",
//     },
//     { 
//       name: "Citra",
//       status: "Hadir",
//       keterangan: "-",
//       date: "2024-06-01",  
//       check_in_time: "08:30", 
//       check_out_time: "08:30",
//     },
//     { 
//       name: "Dewi",
//       status: "Hadir", 
//       keterangan: "-",
//       date: "2024-06-01", 
//       check_in_time: "08:10", 
//       check_out_time: "08:10",
//     },
//     { 
//       name: "Eka",
//       status: "Hadir", 
//       keterangan: "-",
//       date: "2024-06-01", 
//       check_in_time: "08:15", 
//       check_out_time: "08:15",
//     },
//     { 
//       name: "Fajar",
//       status: "Sakit", 
//       keterangan: "-",
//       date: "2024-06-01", 
//       check_in_time: "-:-", 
//       check_out_time: "-:-" },

//       { 
//       name: "Gina",
//       status: "Hadir", 
//       keterangan: "-",
//       date: "2024-06-01", 
//       check_in_time: "08:20", 
//       check_out_time: "08:20",
//     },
//     { 
//       name: "Hari",
//       status: "Hadir",
//       keterangan: "-",
//       date: "2024-06-01",  
//       check_in_time: "08:25", 
//       check_out_time: "08:25",
//     },
//     { 
//       name: "Intan",
//       status: "Alfa", 
//       keterangan: "-",
//       date: "2024-06-01", 
//       check_in_time: "-:-", 
//       check_out_time: "-:-" },

//       { 
//       name: "Joko",
//       status: "Izin",
//       keterangan: "-",
//       date: "2024-06-01",  
//       check_in_time: "-:-", 
//       check_out_time: "-:-",
//     },

//     { 
//       name: "Ucok",
//       status: "Alfa", 
//       keterangan: "-",
//       date: "2024-06-04", 
//       check_in_time: "-:-", 
//       check_out_time: "-:-" },

//     { 
//       name: "Abeng",
//       status: "Sakit", 
//       keterangan: "-",
//       date: "2024-06-05", 
//       check_in_time: "-:-", 
//       check_out_time: "-:-" },

//   ]
// }

// function getReportData(): Report[] {
//   // Fetch data from your API here.
//   return [
//     { 
//       file: "report_andi.pdf",
//       name: "Andi",
//       status: "Izin",
//       keterangan: "Izin ke kampus",
//     },

//     { 
//       file: "report_sandi.pdf",
//       name: "Sandi",
//       status: "Sakit",
//       keterangan: "Izin Sakit",
//     },

//     { 
//       file: "report_andi.pdf",
//       name: "Andi",
//       status: "Sakit",
//       keterangan: "Masih Sakit",
//     },

//     { 
//       file: "report_sandi.pdf",
//       name: "Sandi",
//       status: "Sakit",
//       keterangan: "Ketularan Sakit",
//     },

//     { 
//       file: "report_dono.pdf",
//       name: "Dono",
//       status: "Izin",
//       keterangan: "Main ke luar kota",
//     },

//     { 
//       file: "report_dono.pdf",
//       name: "Dono",
//       status: "Sakit",
//       keterangan: "Demam tinggi",
//     },

//     { 
//       file: "report_sandi.pdf",
//       name: "Sandi",
//       status: "Izin",
//       keterangan: "Tidak ada keterangan",
//     },

//     { 
//       file: "report_vior.pdf",
//       name: "Vior",
//       status: "Izin",
//       keterangan: "Nikah",
//     },
//   ]

// }

// type TablePageProps =
//   | { activeTab: string; type: "attendance"; serverData: Attendance[] }
//   | { activeTab: string; type: "reports" }

// export default function TablePage(props: TablePageProps) {
//   const { activeTab, type } = props

//   const data = type === "reports" ? getReportData() : (props.serverData?.length ? props.serverData : getData())

//   // Filter sesuai tab aktif
//   const filteredData =
//     activeTab === "Semua Daftar"
//       ? data
//       : type === "attendance"
//         ? (data as Attendance[]).filter((item) => item.status === activeTab)
//         : (data as Report[]).filter((item) => item.status === activeTab)

//   if (type === "reports") {
//     return (
//       <div className="w-full">
//         <DataTable
//           columns={reportColumns}
//           data={filteredData as Report[]}
//           enableFilter={false}
//           enableColumnVisibility={false}
//           // pageSize={5}
//         />
//       </div>
//     )
//   } else {
//     return (
//       <div className="w-full">
//         <DataTable
//           columns={columns}
//           data={filteredData as Attendance[]}
//           enableFilter={false}
//           enableColumnVisibility={false}
//           // pageSize={5}
//         />
//       </div>
//     )
//   }
// }