// src/components/AttendanceHistory.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Download, Clock, MapPin, Calendar } from "lucide-react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { getAttendanceHistory, AttendanceRecord } from "@/lib/attendance";
import { supabase } from "@/lib/supabaseClient";

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("All Records");

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

        const records: AttendanceRecord[] | null =
          await getAttendanceHistory(userId);
        setAttendanceData(records || []);
      } catch (error: any) {
        console.error("Get attendance history error:", error);
        setErrorMsg(error?.message || "Gagal memuat data absensi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map styling untuk status
  const statusClasses: Record<
    NonNullable<AttendanceRecord["status"]>,
    string
  > = {
    present: "bg-green-100 text-green-800",
    late: "bg-yellow-100 text-yellow-800",
    absent: "bg-red-100 text-red-800",
    early_leave: "bg-blue-100 text-blue-800",
  };

  const statusLabels: Record<NonNullable<AttendanceRecord["status"]>, string> = {
    present: "Present",
    late: "Late",
    absent: "Absent",
    early_leave: "Early Leave",
  };

  const filteredData =
    activeTab === "All Records"
      ? attendanceData
      : attendanceData.filter(
          (record) =>
            record.status?.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Attendance History</h1>
            <p className="text-gray-500">
              Track your attendance records and patterns
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Download size={18} />
            Export PDF
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b mt-6">
          {["All Records", "Present", "Late", "Absent", "Early Leave"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {loading ? (
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
                      record.status
                        ? statusClasses[record.status]
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {record.status
                      ? statusLabels[record.status]
                      : "Unknown"}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock size={16} /> Check In: {record.checkIn || "-"}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <MapPin size={16} /> Location: {record.location || "-"}
                  </div>
                  <div className="flex items-center gap-2 text-red-600">
                    <Clock size={16} /> Check Out: {record.checkOut || "-"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No attendance records found
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
