'use client'
import { useState, useEffect, useRef } from "react";
// Icons
import { GoClock } from "react-icons/go";
import { Badge } from "@/components/ui/badge";
// Components
import { useInsertAlfa } from '@/hooks/useAttendance';
import { statusColor } from '@/lib/utils';
import { CheckInButton, DisabledButton } from "./AttendanceButtonHandler";
import RealtimeDashboardRefresher from "@/components/RealtimeDashboardRefresher";
import { internSummary, internSchedule } from "@/types/intern";
import { isWithinSchedule, getScheduleMessage } from "@/lib/helper/schedule.helper"

interface internTodayAttendanceProps {
  internData: internSummary | null;
  scheduleData: internSchedule | null;
}

export default function TodaysAttendance({ internData, scheduleData }: internTodayAttendanceProps) {
  const { checkAndInsertAlfaStatus, error: alfaError } = useInsertAlfa();
  const [currentTime, setCurrentTime] = useState(new Date());

  const status = internData?.status ?? "-";
  const todayStatus = statusColor(status);
  const isAlfa = todayStatus.text === "Alfa";
  const isIzin = todayStatus.text === "Izin";
  const isSakit = todayStatus.text === "Sakit";
  const hasInsertedAlfaRef = useRef(false);

  // const showCheckInButton = (!internData?.status || internData.status === "-" || todayStatus.text === "Belum Tercatat");
  const hasCheckIn = internData?.today_check_in && internData.today_check_in !== "-";

  // Check if within schedule
  const withinSchedule = scheduleData ? 
    isWithinSchedule(scheduleData.start_time, scheduleData.end_time) : false;
  
  // Get appropriate message
  const buttonMessage = scheduleData ? 
    getScheduleMessage(scheduleData.start_time, scheduleData.end_time) : 
    "Tidak ada jadwal absen";

  // Update time every minute to refresh button state
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (internData?.user_id && !internData?.status && !hasInsertedAlfaRef.current) {
      checkAndInsertAlfaStatus();
      hasInsertedAlfaRef.current = true; // tandai sudah insert alfa hari ini
    }
  }, [internData?.user_id, internData?.status, alfaError, checkAndInsertAlfaStatus]);

  return (
    <div className='flex flex-col border-2 gap-6 py-4 px-5 rounded-md'>
      {/* Header */}
      <div className='flex items-center justify-center gap-3'>
        <GoClock className='text-blue-500 w-6 h-6' />
        <h4 className='h4 font-semibold'>Presensi Hari Ini</h4>
      </div>

      {/* Status */}
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h1>Status:</h1>
          <Badge
            variant='default'
            className={todayStatus.class}
          >
            {todayStatus.text}
          </Badge>
        </div>
        <div className='flex justify-between'>
          <h1>Check In:</h1>
          <h1 className='font-semibold'>
            {internData?.today_check_in ?? "-"}
          </h1>
        </div>
      </div>

      <>
        {isAlfa && (
          <DisabledButton message="Tidak hadir tanpa keterangan" />
        )}

        {isIzin && (
          <DisabledButton message="Izin tidak hadir" />
        )}

        {isSakit && (
          <DisabledButton message="Tidak hadir karena sakit" />
        )}

        {hasCheckIn && (
          <DisabledButton message="Telah melakukan absensi" />
        )}

        { !isAlfa && !isIzin && !isSakit && !hasCheckIn && (
          withinSchedule ? (
            <CheckInButton message="Silakan lakukan absensi" />
          ) : (
            <DisabledButton message={buttonMessage} />
          )
          
        ) }
      </>
      <RealtimeDashboardRefresher />
    </div>
  );
}
