import { GoClock, GoPeople } from "react-icons/go";
import { FiTrendingUp } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";

import TodayInternStatus from '@/components/today-intern-status/page';
import { auth } from '@/lib/server/auth'; 
import '../../globals.css';
import Image from 'next/image';
import DashboardClock from "@/components/DashboardClock";
import { Card, CardContent } from "@/components/Card";
import StatCard from "@/components/StatCard";

export default async function SupervisorDashboard() {
  const session = await auth();

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
          <DashboardClock/>
        </div>
      </div>

      <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-6 max-md:grid-cols-2 mb-5'>
        <Card>
          <CardContent className='flex items-center p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1'>
            <StatCard
              Icon={GoPeople}
              title='Total Interns'
              value="4"
              contentColor='text-blue-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='flex items-center p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1'>
            <StatCard
              Icon={GoClock}
              title='Present Today'
              value={"4"}
              contentColor='text-green-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='flex items-center p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1'>
            <StatCard
              Icon={IoDocumentTextOutline}
              title='Pending Leaves'
              value={"2"}
              contentColor='text-yellow-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='flex items-center p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1'>
            <StatCard
              Icon={FiTrendingUp}
              title='Avg Attendance'
              value={"100"}
              contentColor='text-indigo-600'
            />
          </CardContent>
        </Card>
      </div>

      {/* Today's Intern Status */}
      <TodayInternStatus />
    </>
  );
}
