
// src/components/AttendanceHistory.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Download, Clock, MapPin, Calendar } from "lucide-react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { getAttendanceHistory } from "@/lib/attendance";
import { supabase } from "@/lib/supabaseClient";
import TabelSupervisor from "@/app/tabel-supervisor/page";
import { AttendanceRecord } from "@/lib/attendance";

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Semua Daftar");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     setErrorMsg("");

  //     try {
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();

  //       const userId = session?.user?.id;

  //       if (!userId) {
  //         setLoading(false);
  //         return;
  //       }

  //       const records: AttendanceRecord[] | null = await getAttendanceHistory(userId);
  //       setAttendanceData(records || []);
  //     } catch (error: unknown) {
  //       console.error("Get attendance history error:", error);
  //       if (error instanceof Error) {
  //         setErrorMsg(error.message);
  //       } else {
  //         setErrorMsg("Gagal memuat data absensi");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const filteredData =
  //   activeTab === "Semua Daftar"
  //     ? attendanceData
  //     : attendanceData.filter(
  //         (record) =>
  //           record.status?.toLowerCase() === activeTab.toLowerCase()
  //       );

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daftar Kehadiran</h1>
            <p className="text-gray-500">
              Lacak catatan dan pola kehadiran anak magang
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Download size={18} />
            Export PDF
          </button>
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
          {/* {loading ? (
            <div className="text-center text-gray-500 mt-10">
              Loading attendance records...
            </div>
          ) : errorMsg ? (
            <div className="text-center text-red-500 mt-10">{errorMsg}</div>
          ) : filteredData.length > 0 ? (
            filteredData.map((record, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-gray-500" />
                    <span className="font-semibold">{record.date}</span>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      record.status === "present"
                        ? "bg-green-100 text-green-800"
                        : record.status === "late"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {record.status}
                  </span>
                </div>

                
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No attendance records found
            </div>
          )} */}
        </div>
        <TabelSupervisor activeTab={activeTab}/>
      </div>
    </LayoutWrapper>
  );
}

