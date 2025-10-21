"use client";
import { useInternData } from "@/hooks/useInternData";
import PieChart from "@/components/PieChart";
import TodaysAttendance from "@/components/TodaysAttendance";
import DashboardStats from "./DashboardStatsClient";
import DashboardHeader from "./DashboardHeaderClient";
import DashboardSkeleton from "./DashboardSkeleton";

export default function DashboardContent() {
  const { summaryData, loading, error } = useInternData();

  if (loading) {
    return <DashboardSkeleton />;
  }
  
  return (
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
  );
}