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