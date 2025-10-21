// "use client";
// import { useEffect } from "react";
// // Icons
// import { GoClock } from "react-icons/go";
// import { IoDocumentTextOutline } from "react-icons/io5";
// // Components
// import PieChart from "@/components/PieChart";
// import TodaysAttendance from "@/components/TodaysAttendance";
// import DashboardClock from "@/components/DashboardClock";
// import { getWorkdaysInMonth, formatNama } from "@/lib/utils";
// // Styles
// import "../../globals.css";
// import Image from "next/image";

// import { useInternData } from "@/hooks/useInternData";

// export default function InternDashboard() {
//   const { summaryData, loading, error } = useInternData();
//   const totalHariKerja = getWorkdaysInMonth();

//   useEffect(() => {
//     console.log("Summary data:", summaryData);
//     console.log("Loading:", loading);
//     console.log("Error:", error);
//   }, [summaryData, loading, error]);

//   return (
//     <>
//       {/* 1. Informasi nama, tanggal, dan waktu */}
//       <div className='relative bg-blue-500 space-y-2 mb-2 md:mb-4 h-48 p-4 lg:p-8 rounded-lg overflow-hidden'>
//         <Image
//           src='/overlayBuilding.webp'
//           alt='Overlay'
//           fill
//           priority
//           className='absolute inset-0 object-cover opacity-25 z-0'
//         />

//         <div className='relative z-10'>
//           <h1 className='title_header capitalize'>
//             Selamat Datang, {loading ? "-" : summaryData?.nama ? formatNama(summaryData.nama) : "-"}
//           </h1>
//           <DashboardClock />
//         </div>
//       </div>

//       {/* 2. Today attendance, Piechart */}
//       <div className='flex flex-col md:flex-row w-full gap-2 md:gap-4'>
//         {/* Attendance */}
//         <div className="flex flex-col w-full md:w-1/2 gap-2 md:gap-4">
//           <TodaysAttendance />

//           <div className='flex flex-col w-full gap-2 md:gap-4 sm:flex-row'>
//             <div className='flex w-full gap-2 sm:gap-4'>
//               <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
//                 <div>
//                   <GoClock className='text-green-600 bg-green-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
//                 </div>
//                 <div className='flex flex-col gap-1'>
//                   <h1 className='text-sm lg:text-lg font-semibold text-black/50'>
//                     Bulan Ini
//                   </h1>
//                   <h1 className='h5 sm:h3 font-bold'>
//                     {loading ? "-" : summaryData?.total_hadir_bulanan ?? "0"}/
//                     {totalHariKerja}
//                   </h1>
//                   <h1 className='text-xs sm:h6 font-semibold text-green-600'>
//                     Kehadiran
//                   </h1>
//                 </div>
//               </div>

//               <div className='flex w-1/2 p-4 border-2 items-center justify-center sm:justify-evenly rounded-md gap-4'>
//                 <div>
//                   <IoDocumentTextOutline className='text-[#CA8A04] bg-[#FEF9C3] p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
//                 </div>
//                 <div className='flex flex-col gap-1'>
//                   <h1 className='text-sm lg:text-lg font-semibold text-black/50'>
//                     Dispensasi
//                   </h1>
//                   <h1 className='h5 sm:h3 font-bold'>
//                     {loading ? "-" : summaryData?.total_dispensasi ?? "0"}
//                   </h1>
//                   <h1 className='text-xs sm:h6 font-semibold text-[#CA8A04]'>
//                     Disetujui
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Piechart */}
//         <div className='flex flex-col w-full md:w-1/2 border-2 gap-4 py-4 px-5 rounded-md'>
//           {/* Chart */}
//           <div className='flex items-center justify-center w-full'>
//             <PieChart />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { Suspense } from "react";
// Components
import PieChart from "@/components/PieChart";
import TodaysAttendance from "@/components/TodaysAttendance";
import DashboardStats from "./components/DashboardStatsClient";
import DashboardHeader from "./components/DashboardHeaderClient";
import DashboardSkeleton from "./components/DashboardSkeleton";

export default function InternDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <>
        {/* 1. Informasi nama, tanggal, dan waktu */}
        <DashboardHeader />

        {/* 2. Today attendance, Piechart */}
        <div className='flex flex-col md:flex-row w-full gap-2 md:gap-4'>
          {/* Attendance */}
          <div className="flex flex-col w-full md:w-1/2 gap-2 md:gap-4">
            <TodaysAttendance />
            <DashboardStats />
          </div>

          {/* Piechart */}
          <div className='flex flex-col w-full md:w-1/2 border-2 gap-4 py-4 px-5 rounded-md'>
            <div className='flex items-center justify-center w-full'>
              <PieChart />
            </div>
          </div>
        </div>
      </>
    </Suspense>
  );
}