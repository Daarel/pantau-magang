'use client'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

// Icons
import { GoClock, GoPeople } from "react-icons/go";
import { FiTrendingUp } from 'react-icons/fi';
import { IoDocumentTextOutline } from "react-icons/io5";
// Components
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import TodayInternStatus from '@/app/today-intern-status/page';
// Styles
import '../../../globals.css'

export default function SupervisorDashboard() {
  return (
    <LayoutWrapper>
      <div className='flex flex-col items-center min-h-screen w-full gap-4'>
        {/* 1. Header */}
        <div className='bg-[#16A049] w-full p-7 rounded-md'>
          <h1 className='title_header'>Supervisor Dashboard</h1>
          <h6 className='text-xl mb-1 text-white'>Welcome, Yasdi Pramesti</h6>
          <h6 className='text-xl mb-1 text-white'>Manage your assigned interns and track their progress</h6>
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

        {/* Recent Leave Requests & Attendance Summary */}
        <div className='flex flex-col sm:flex-row w-full gap-4'>
          {/* Recent Leave Requests */}
          <div className="flex flex-col w-full sm:w-1/2 p-4 border-2 rounded-md">
            <h5 className="h5 font-semibold mb-4">Recent Leave Requests</h5>
            {/* Parent Scroll */}
            <div className="space-y-2 max-h-42 overflow-y-auto">
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-md border">
                <div className="flex flex-col gap-1">
                  <h6 className="h6 font-semibold">John Doe</h6>
                  <p className="text-sm text-black/50">Sick Leave - 2 Days</p>
                </div>
                <div>
                  <Badge className="bg-yellow-200 text-yellow-800">Pending</Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-md border">
                <div className="flex flex-col gap-1">
                  <h6 className="h6 font-semibold">Jane Smith</h6>
                  <p className="text-sm text-black/50">Annual Leave - 3 Days</p>
                </div>
                <div>
                  <Badge className="bg-yellow-200 text-yellow-800">Pending</Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-md border">
                <div className="flex flex-col gap-1">
                  <h6 className="h6 font-semibold">Michael Lee</h6>
                  <p className="text-sm text-black/50">Sick Leave - 1 Day</p>
                </div>
                <div>
                  <Badge className="bg-yellow-200 text-yellow-800">Pending</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Leave Requests */}
          <div className="flex flex-col w-full sm:w-1/2 p-4 border-2 rounded-md">
            <h5 className="h5 font-semibold mb-4">Attendance Summary</h5>
            <div className="flex flex-col items-center p-4 space-y-4">
              <div className="flex w-full justify-between">
                <div>
                  <h6 className="h6">This Week</h6>
                </div>
                <div>
                  <h6 className="h6 font-semibold">87% Present</h6>
                </div>
              </div>
              <Progress value={87} />
              <div className="flex w-full justify-between">
                <div>
                  <h6 className="h6 text-green-400">35 Present</h6>
                </div>
                <div>
                  <h6 className="h6 text-red-400">5 Absent</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
