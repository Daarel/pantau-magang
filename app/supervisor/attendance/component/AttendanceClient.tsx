"use client";

import { useState } from "react";
import { AttendanceTable } from "@/app/tabel-supervisor/page";

export default function AttendanceClient() {
  const [activeTab, setActiveTab] = useState("Semua Daftar");

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Daftar Kehadiran</h1>
          <p className="text-gray-500">
            Lacak catatan dan pola kehadiran anak magang
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mt-6">
        {["Semua Daftar", "Hadir", "Sakit", "Izin", "Alfa"].map((tab) => (
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
      <div className="mt-6 space-y-4">
        <AttendanceTable/>
      </div>
    </div>
  );
}
