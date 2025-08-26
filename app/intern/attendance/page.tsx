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
        <AttendanceForm />
      </div>
    </LayoutWrapper>
  );
}
