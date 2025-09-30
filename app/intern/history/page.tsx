// src/components/AttendanceHistory.tsx
"use client";
import React, { useState } from "react";
import { InternAttendanceTable } from "@/components/today-intern-status/page"
import ExportAttendanceButton from "@/components/ExportAttendanceButton";

export default function InternHistory() {
  const [activeTab, setActiveTab] = useState<string>("Semua Riwayat");

  return (
    <div className='flex flex-col min-h-screen gap-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='h4 font-semibold'>Riwayat Kehadiran</h1>
          <p className='text-gray-500 text-[12px] md:text-[16px]'>
            Lacak catatan dan pola kehadiran Anda
          </p>
        </div>
        <ExportAttendanceButton />
      </div>

      <div className="flex flex-col border-2 rounded-lg p-2">
        {/* Tabs */}
        <div className='flex gap-6 border-b text-[14px] md:text-[16px] justify-evenly sm:justify-normal'>
          {["Semua Riwayat", "Hadir", "Sakit", "Izin", "Alfa"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 cursor-pointer ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className='space-y-4'>
          <InternAttendanceTable activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
