import LayoutWrapper from '@/components/layout/LayoutWrapper'
import React, { useState, useEffect } from 'react';
// Icons
import { GoClock } from "react-icons/go";
import { FiCalendar, } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
// Components
import { Badge } from "@/components/ui/badge"
import PieChart from '@/components/PieChart';
// Styles
import '../../globals.css'

export default function InternDashboard() {
  return (
    <LayoutWrapper>
      <div className='flex flex-col items-center min-h-screen gap-4'>
        {/* 1. Name, date, time */}
        <div className='bg-blue-500 w-full p-4 rounded-md'>
          <h2 className='h2 mb-2 text-white'>Welcome, M Bagas Ferdiansyah!</h2>
          <h6 className='h6 mb-2 text-white'>Thursday, August 14th, 2025</h6>
          <h6 className='h6 mb-2 text-white'>13:18:15</h6>
        </div>

        {/* 2. Today attendance, Piechart */}
        <div className='flex flex-col md:flex-row w-full gap-3'>
          {/* Attendance */}
          <div className='flex flex-col w-full md:w-1/2 border-2 gap-6 p-4 rounded-md'>
            {/* Header */}
            <div className='flex items-center justify-center gap-3'>
              <GoClock className='text-blue-500 w-6 h-6' />
              <h4 className='h5 font-semibold'> Today's Attendance</h4>
            </div>

            {/* Status */}
            <div className='flex flex-col px-5 gap-4'>
              <div className='flex justify-between'>
                <h1>Status:</h1>
                <Badge variant="default" className='bg-[#FEF9C3] text-[#854D0E]'>Badge</Badge>
              </div>
              <div className='flex justify-between'>
                <h1>Check In:</h1>
                <h1 className='font-semibold'>13:43:15</h1>
              </div>
              <div className='flex justify-between'>
                <h1>Check Out:</h1>
                <h1 className='font-semibold'>13:43:20</h1>
              </div>
            </div>
          </div>

          {/* Piechart */}
          <div className='flex flex-col w-full md:w-1/2 border-2 gap-4 p-4 rounded-md'>
            {/* Chart */}
            <div className='flex items-center justify-center'>
              <PieChart />
            </div>
          </div>
        </div>

        {/* 3. Summary */}
        <div className='flex flex-col w-full gap-4 sm:flex-row'>
          {/* Schedule */}
          <div className='flex w-full sm:w-2/5 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
            <div>
              <FiCalendar className='text-blue-600 bg-blue-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm lg:text-lg font-semibold text-black/50'>Schedule</h1>
              <div className='flex gap-4'>
                <div className='flex flex-col justify-center'>
                  <h1 className='h5 md:h3 font-bold'>08:00</h1>
                  <h1 className='text-xs sm:h6 font-semibold text-blue-600'>Start Time</h1>
                </div>
                <div className='flex flex-col justify-center'>
                  <h1 className='h5 md:h3 font-bold'>15:00</h1>
                  <h1 className='text-xs sm:h6 font-semibold text-blue-600'>End Time</h1>
                </div>
              </div>
            </div>
          </div>

          {/* This Month & Leave Request */}
          <div className='flex w-full sm:w-3/5 gap-2 sm:gap-4'>
          {/* This Month */}
            <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
              <div>
                <GoClock className='text-green-600 bg-green-200 p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
              </div>
              <div className='flex flex-col gap-1'>
                <h1 className='text-sm lg:text-lg font-semibold text-black/50'>This Month</h1>
                <h1 className='h5 sm:h3 font-bold'>22/23</h1>
                <h1 className='text-xs sm:h6 font-semibold text-green-600'>Days Present</h1>
              </div>
            </div>

            {/* Leave Request */}
            <div className='flex w-1/2 p-4 border-2 items-center justify-center sm:justify-evenly rounded-md gap-4'>
              <div>
                <IoDocumentTextOutline className='text-[#CA8A04] bg-[#FEF9C3] p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
              </div>
              <div className='flex flex-col gap-1'>
                <h1 className='text-sm lg:text-lg font-semibold text-black/50'>Leave Request</h1>
                <h1 className='h5 sm:h3 font-bold'>1</h1>
                <h1 className='text-xs sm:h6 font-semibold text-[#CA8A04]'>Pending</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
