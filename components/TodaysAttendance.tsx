import React from 'react'
import { useRouter } from 'next/navigation';
// Icons
import { GoClock } from "react-icons/go";
import { Badge } from "@/components/ui/badge"
// Components
import { Button } from "@/components/ui/button";
import { CheckOutModal } from "@/components/CheckOutModal"

export default function TodaysAttendance() {
  const router = useRouter();
  return (
    <div className='flex flex-col w-full md:w-1/2 border-2 gap-6 py-4 px-5 rounded-md'>
      {/* Header */}
      <div className='flex items-center justify-center gap-3'>
        <GoClock className='text-blue-500 w-6 h-6' />
        <h4 className='h4 font-semibold'>Presensi Hari Ini</h4>
      </div>

      {/* Status */}
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h1>Status:</h1>
          {/* <Badge variant="default" className='bg-[#FEF9C3] text-[#854D0E]'>Belum Tercatat</Badge> */}
          <Badge variant="default" className='bg-green-100 text-green-800'>Hadir</Badge>
        </div>
        <div className='flex justify-between'>
          <h1>Check In:</h1>
          <h1 className='font-semibold'>13:43:15</h1>
        </div>
        <div className='flex justify-between'>
          <h1>Check Out:</h1>
          <h1 className='font-semibold'>--:--:--</h1>
        </div>
      </div>
      {/* Button Check In */}
      {/* <Button 
        size='icon' 
        className='w-full bg-green-200 hover:bg-green-300 border-green-700 active:bg-green-400 transition-colors duration-100 shadow'
        onClick={() => router.push('/intern/attendance')}
      >
        <h5 className='text-black/80 font-bold'>Silakan Absen Masuk</h5>
      </Button> */}
      {/* Button Check Out */}
      <CheckOutModal />
    </div>
  )
}
