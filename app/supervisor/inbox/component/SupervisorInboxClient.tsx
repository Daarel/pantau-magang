"use client";

import { useState } from "react";
import { ReportTable }  from "@/components/tabel-supervisor/AttendanceTable";

export default function SupervisorInboxClient({ supervisorId }: { supervisorId: string }) {
  const [activeTab, setActiveTab] = useState("Semua Daftar");

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Perizinan</h1>
          <p className="text-gray-500">
            Konfirmasi dokumen perizinan peserta magang
          </p>
        </div>
      </div>

      <div className="flex flex-col border-2 rounded-lg p-2">
        {/* Tabs */}
        <div className="flex gap-6 border-b">
          {["Semua Daftar", "Sakit", "Izin"].map((tab) => (
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
        <div className="space-y-4">
          <ReportTable activeTab={activeTab} supervisorId={supervisorId} />
        </div>
      </div>
    </div>
  );
}
