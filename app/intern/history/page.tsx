// src/components/AttendanceHistory.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Download, Clock, MapPin, Calendar } from "lucide-react";
import { getAttendanceHistory } from "@/lib/attendance";
import { supabase } from "@/lib/supabaseClient";
import { AttendanceRecord } from "@/lib/attendance";
import { InternAttendanceTable } from "@/components/today-intern-status/page"

export default function InternHistory() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Semua Riwayat");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const userId = session?.user?.id;

        if (!userId) {
          setLoading(false);
          return;
        }

        const records: AttendanceRecord[] | null = await getAttendanceHistory(
          userId
        );
        setAttendanceData(records || []);
      } catch (error: unknown) {
        console.error("Get attendance history error:", error);
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("Gagal memuat data absensi");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col min-h-screen gap-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='h4 font-semibold'>Riwayat Kehadiran</h1>
          <p className='text-gray-500'>
            Lacak catatan dan pola kehadiran Anda
          </p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'>
          <Download size={18} />
          Export PDF
        </button>
      </div>

      <div className="flex flex-col border-2 rounded-lg p-2">
        {/* Tabs */}
        <div className='flex gap-6 border-b'>
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
