"use client";
import { useEffect } from "react";
// Icons
import { GoClock } from "react-icons/go";
import { FiCalendar } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
// Components
import PieChart from "@/components/PieChart";
import TodaysAttendance from "@/components/TodaysAttendance";
import DashboardClock from "@/components/DashboardClock"
import { getWorkdaysInMonth, } from "@/lib/utils"
// Styles
import "../../globals.css";
import Image from "next/image";

import { useDashboardData } from '@/hooks/useDashboardData'

export default function InternDashboard() {
  const { summaryData, loading, error } = useDashboardData()
  const totalHariKerja = getWorkdaysInMonth()

  useEffect(() => {
    console.log("Summary data:", summaryData);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [summaryData, loading, error]);

  return (
    <>
      {/* 1. Informasi nama, tanggal, dan waktu */}
      <div className='relative bg-blue-500 space-y-2 mb-4 h-48 p-4 lg:p-8 rounded-lg overflow-hidden'>
        <Image
          src='/overlayBuilding.jpeg'
          alt='Overlay'
          fill
          priority
          className='absolute inset-0 object-cover opacity-25 z-0'
        />

        <div className='relative z-10'>
          <h1 className='title_header'>
            Selamat Datang, Dika Arnanda Putra!
          </h1>
          <DashboardClock />
        </div>
      </div>

      {/* 2. Today attendance, Piechart */}
      <div className='flex flex-col md:flex-row w-full gap-4 mb-4'>
        {/* Attendance */}
        <TodaysAttendance />

        {/* Piechart */}
        <div className='flex flex-col w-full md:w-1/2 border-2 gap-4 py-4 px-5 rounded-md'>
          {/* Chart */}
          <div className='flex items-center justify-center w-full'>
            <PieChart />
          </div>
        </div>
      </div>

      {/* 3. Summary */}
      <div className='flex flex-col w-full gap-4 sm:flex-row'>
        {/* Schedule */}
        <div className='flex w-full sm:w-1/3 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
          <div>
            <FiCalendar className='text-blue-600 bg-blue-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
          </div>
          <div className='flex flex-col gap-1'>
            <h1 className='text-sm lg:text-lg font-semibold text-black/50'>
              Jadwal
            </h1>
            <div className='flex gap-4'>
              <div className='flex flex-col justify-center'>
                <h1 className='h5 md:h3 font-bold'>{loading ? "-" : summaryData?.start_time ?? "-"}</h1>
                <h1 className='text-xs sm:h6 font-semibold text-blue-600'>
                  Masuk
                </h1>
              </div>
              <div className='flex flex-col justify-center'>
                <h1 className='h5 md:h3 font-bold'>{loading ? "-" : summaryData?.end_time ?? "-"}</h1>
                <h1 className='text-xs sm:h6 font-semibold text-blue-600'>
                  Pulang
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* This Month & Leave Request */}
        <div className='flex w-full sm:w-2/3 gap-2 sm:gap-4'>
          {/* This Month */}
          <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
            <div>
              <GoClock className='text-green-600 bg-green-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm lg:text-lg font-semibold text-black/50'>
                Bulan Ini
              </h1>
              <h1 className='h5 sm:h3 font-bold'>
                {loading? "-" : summaryData?.total_hadir_bulanan ?? "0"}/{totalHariKerja}
              </h1>
              <h1 className='text-xs sm:h6 font-semibold text-green-600'>
                Kehadiran
              </h1>
            </div>
          </div>

          {/* Dispensasi */}
          <div className='flex w-1/2 p-4 border-2 items-center justify-center sm:justify-evenly rounded-md gap-4'>
            <div>
              <IoDocumentTextOutline className='text-[#CA8A04] bg-[#FEF9C3] p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm lg:text-lg font-semibold text-black/50'>
                Dispensasi
              </h1>
              <h1 className='h5 sm:h3 font-bold'>
                {loading? "-" : summaryData?.total_dispensasi ?? "0"}
              </h1>
              <h1 className='text-xs sm:h6 font-semibold text-[#CA8A04]'>
                Disetujui
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
