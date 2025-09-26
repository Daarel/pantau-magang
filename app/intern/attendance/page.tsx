// src/components/AttendanceHistory.tsx
"use client";
import React, { useEffect, useState } from "react";
// Components
import { AttendanceForm } from "@/components/AttendanceForm";
import { AttendanceInfo } from "@/components/AttendanceInfo";
import { useAttendanceData } from "@/hooks/useAttendance";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
// Icons
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function Attendance() {
  const { attendanceData, loading, error } = useAttendanceData("Semua Riwayat");
  const [todayStatus, setTodayStatus] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkTodaysAttendance = async () => {
      try {
        // Dapatkan user data dari supabase.auth
        const { data: { user }, error: authError, } = await supabase.auth.getUser();
        
        if (authError || !user) {
          redirect("/");
          return;
        }

        // Dapatkan user_id dari tabel users berdasarkan auth_id
        const { data: userData } = await supabase
          .from("users")
          .select("id")
          .eq("auth_id", user.id)
          .single();

        if (!userData) return;

        // Cari presensi hari ini
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
        const currentHour = today.getHours();
        const currentMinutes = today.getMinutes();

        // Pastikan attendanceData adalah array sebelum menggunakan find
        const todayRecord = Array.isArray(attendanceData) 
          ? attendanceData.find((record) => {
              // Pastikan record.date dalam format yang sama (YYYY-MM-DD)
              const recordDate = new Date(record.date).toISOString().split('T')[0];
              return recordDate === todayString && record.user_id === userData.id;
            })
          : null;

        if (todayRecord) {
          // Jika ada record untuk hari ini, gunakan status dari record
          setTodayStatus(todayRecord.status);
        } else if (currentHour > 9 || (currentHour === 9 && currentMinutes > 0)) {
          // Jika sudah lewat jam 09:00 dan tidak ada presensi, set status sebagai alfa
          setTodayStatus("alfa");
        } else {
          // Jika belum presensi dan belum lewat jam 09:00
          setTodayStatus(null);
        }
      } catch (err) {
        console.error("Error checking today's attendance:", err);
      }
    };

    if (!loading && attendanceData) {
      checkTodaysAttendance();
    }
  }, [attendanceData, loading, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        {/* {todayStatus ? (
          <AttendanceInfo status={todayStatus} />
        ) : (
          <AttendanceForm />
        )} */}
        <AttendanceForm />
      </div>
    </>
  );
}
