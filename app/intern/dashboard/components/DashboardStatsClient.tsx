// components/DashboardStats.tsx
'use client';

import { GoClock } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useInternData } from "@/hooks/useInternData";
import { getWorkdaysInMonth } from "@/lib/utils";
import DashboardSkeleton from "./DashboardSkeleton";

export default function DashboardStats() {
  const { summaryData, loading } = useInternData();
  const totalHariKerja = getWorkdaysInMonth();

  // if (loading) {
  //   return <DashboardSkeleton />;
  // }

  return (
    <div className='flex flex-col w-full gap-2 md:gap-4 sm:flex-row'>
      <div className='flex w-full gap-2 sm:gap-4'>
        <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
          <div>
            <GoClock className='text-green-600 bg-green-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
          </div>
          <div className='flex flex-col gap-1'>
            <h1 className='text-sm lg:text-lg font-semibold text-black/50'>
              Bulan Ini
            </h1>
            <h1 className='h5 sm:h3 font-bold'>
              {loading ? "-" : summaryData?.total_hadir_bulanan ?? "0"}/
              {totalHariKerja}
            </h1>
            <h1 className='text-xs sm:h6 font-semibold text-green-600'>
              Kehadiran
            </h1>
          </div>
        </div>

        <div className='flex w-1/2 p-4 border-2 items-center justify-center sm:justify-evenly rounded-md gap-4'>
          <div>
            <IoDocumentTextOutline className='text-[#CA8A04] bg-[#FEF9C3] p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
          </div>
          <div className='flex flex-col gap-1'>
            <h1 className='text-sm lg:text-lg font-semibold text-black/50'>
              Dispensasi
            </h1>
            <h1 className='h5 sm:h3 font-bold'>
              {loading ? "-" : summaryData?.total_dispensasi ?? "0"}
            </h1>
            <h1 className='text-xs sm:h6 font-semibold text-[#CA8A04]'>
              Disetujui
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}