// src/components/AttendanceHistory.tsx
"use client";
import React, { useEffect, useState } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
// Components
import { AttendanceForm } from "@/components/AttendanceForm";
import { Button } from "@/components/ui/button"
// Icons
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { TbCameraPlus } from 'react-icons/tb';

export default function Attendance() {
  return (
    <LayoutWrapper>
      <div className='flex flex-col min-h-screen gap-4'>
        {/* Header */}
        <div className='flex items-center justify-between gap-4'>
          <h4 className='h4 font-semibold'>Konfirmasi Kehadiran</h4>
          <div className="flex items-center gap-1 text-black/40 text-[12px] md:text-sm">
            <AiOutlineInfoCircle className="w-4 h-4" />
            <h6>Absensi selalu dibuka pukul 08:00 - 09:00</h6>
          </div>
        </div>

        {/* Foto & Form Konfirmasi Kehadiran */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-7 lg:gap-15 border-2 p-6 rounded-md">
          {/* Foto */}
          <div className="flex flex-col md:w-1/2 items-center xl:items-start">
            <Button variant={"outline"} className="flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[400px] w-[200px] lg:w-[400px] rounded-md mb-2 bg-gray-200">
              <TbCameraPlus className="w-4 h-4" />
              <span>Tambahkan foto</span>
            </Button>
            <div className="flex items-center gap-1 text-black/40">
              <AiOutlineInfoCircle className="w-4 h-4" />
              <h6 className="h6">Ukuran foto maks. 3 MB</h6>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col w-full md:w-1/2 gap-3">
            <AttendanceForm />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
