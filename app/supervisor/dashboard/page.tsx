"use client";

// Icons
import { GoClock, GoPeople } from "react-icons/go";
import { FiTrendingUp } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
// Components
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import TodayInternStatus from "@/app/today-intern-status/page";
// Styles
import "../../globals.css";
import Image from "next/image";

export default function SupervisorDashboard() {
  return (
    <> 
      <div className='relative bg-green-500 space-y-2 mb-7 h-48 p-8 rounded-lg overflow-hidden'>
        <Image
          src='/overlayBuilding.jpeg'
          alt='Overlay'
          fill
          priority
          className='absolute inset-0 object-cover opacity-25 z-0'
        />

        <div className='relative z-10'>
          <h1 className='title_header max-sm:text-3xl'>
            Selamat Datang, Dika Arnanda Putra!
          </h1>
          <h2 className='text-white text-2xl max-sm:text-lg'>
            Kamis, 14 Agustus 2025
          </h2>
          <p className='text-white text-lg max-sm:text-sm'>13:18:15</p>
        </div>
      </div>

      {/* 2. Intern Overview */}
      <div className='flex flex-col w-full gap-4 sm:flex-row'>
        {/* Total interns & present today */}
        <div className='flex w-full sm:w-1/2 gap-2 sm:gap-4'>
          {/* Total interns */}
          <div className='flex w-full sm:w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
            <div>
              <GoPeople className='text-blue-600 bg-blue-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <h6 className='h6 font-semibold text-black/50'>Total Interns</h6>
              <h1 className='h3 font-bold'>4</h1>
            </div>
          </div>

          {/* Present today */}
          <div className='flex w-full sm:w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
            <div>
              <GoClock className='text-green-600 bg-green-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <h6 className='h6 font-semibold text-black/50'>Present Today</h6>
              <h1 className='h3 font-bold'>4</h1>
            </div>
          </div>
        </div>

        {/* Pending Leaves & Avg Attendance */}
        <div className='flex w-full sm:w-1/2 gap-2 sm:gap-4'>
          {/* Pending Leaves */}
          <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
            <div>
              <IoDocumentTextOutline className='text-[#CA8A04] bg-[#FEF9C3] p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='h6 font-semibold text-black/50'>Pending Leaves</h1>
              <h1 className='h3 font-bold'>2</h1>
            </div>
          </div>

          {/* Avg Attendance */}
          <div className='flex w-1/2 p-4 border-2 items-center justify-center sm:justify-evenly rounded-md gap-4'>
            <div>
              <FiTrendingUp className='text-purple-600 bg-purple-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='h6 font-semibold text-black/50'>Avg Attendance</h1>
              <h1 className='h3 font-bold'>1</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Intern Status */}
      <TodayInternStatus />
    </>
  );
}
