import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { GoClock, GoPeople } from "react-icons/go";
import { FiTrendingUp } from 'react-icons/fi';
import { IoDocumentTextOutline } from "react-icons/io5";

import TodayInternStatus from '@/app/today-intern-status/page';
import { auth } from '@/lib/server/auth'; 
import '../../globals.css';

export default async function SupervisorDashboard() {
  const session = await auth();

  return (
    <LayoutWrapper>
      <div className='flex flex-col items-center min-h-screen w-full gap-4'>
        {/* 1. Header */}
        <div className='bg-[#16A049] w-full p-7 rounded-md'>
          <h1 className='title_header'>Supervisor Dashboard</h1>
          <h6 className='text-xl mb-1 text-white'>
            Welcome, {session?.id || "Supervisor"}
          </h6>
          <h6 className='text-xl mb-1 text-white'>
            Manage your assigned interns and track their progress
          </h6>
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
            <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
              <div>
                <IoDocumentTextOutline className='text-[#CA8A04] bg-[#FEF9C3] p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md' />
              </div>
              <div className='flex flex-col gap-1'>
                <h1 className='h6 font-semibold text-black/50'>Pending Leaves</h1>
                <h1 className='h3 font-bold'>2</h1>
              </div>
            </div>

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
      </div>
    </LayoutWrapper>
  )
}
