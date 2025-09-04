// src/components/AttendanceHistory.tsx
"use client";
import React, { useEffect, useState } from "react";
// Components
import { AttendanceForm } from "@/components/AttendanceForm";
import { AttendanceInfo } from "@/components/AttendanceInfo";
// Icons
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function Attendance() {
  return (
    <>
      <div className='flex flex-col min-h-screen gap-4'>
        {/* Header */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h4 className='h4 font-semibold'>Konfirmasi Kehadiran</h4>
          </div>
          <div className="flex items-center gap-1 text-black/40 text-[12px] md:text-sm">
            <AiOutlineInfoCircle className="w-4 h-4" />
            <h6>Absensi dibuka pukul 08:00 - 09:00</h6>
          </div>
        </div>

        {/* Foto & Form Konfirmasi Kehadiran */}
        <AttendanceForm />
        <AttendanceInfo status="hadir" />
      </div>
    </>
  );
}
