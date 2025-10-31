"use client";
import PieChart from "@/components/PieChart";
import TodaysAttendance from "@/components/TodaysAttendance";
import DashboardStats from "./DashboardStatsClient";
import DashboardHeader from "./DashboardHeaderClient";
import { internSchedule, internSummary } from "@/types/intern";

interface internDashboardContentProps {
  internData: internSummary | null;
  scheduleData: internSchedule | null;
}

export default function DashboardContent({ internData, scheduleData }: internDashboardContentProps) {
  return (
    <>
      {/* 1. Informasi nama, tanggal, dan waktu */}
      <DashboardHeader internData={internData} />

      {/* 2. Today attendance, Piechart */}
      <div className='flex flex-col md:flex-row w-full gap-2 md:gap-4'>
        {/* Attendance */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 md:gap-4">
          <TodaysAttendance internData={internData} scheduleData={scheduleData} />
          <DashboardStats internData={internData} />
        </div>

        {/* Piechart */}
        <div className='flex flex-col w-full md:w-1/2 border-2 gap-4 py-4 px-5 rounded-md'>
          <div className='flex items-center justify-center w-full'>
            <PieChart internData={internData} />
          </div>
        </div>
      </div>
    </>
  );
}