import React from "react";
// Icons
import { GoClock } from "react-icons/go";
import { Badge } from "@/components/ui/badge";
// Components
import { useDashboardData } from '@/hooks/useDashboardData'
import { statusColor } from '@/lib/utils';
import { CheckInButton, DisabledButton } from "./AttendanceButtonHandler";

export default function TodaysAttendance() {
  const { summaryData, loading, error } = useDashboardData();

  const status = loading ? "-" : summaryData?.status ?? "-";
  const todayStatus = statusColor(status);
  const isAlfa = todayStatus.text === "Alfa";
  const isIzin = todayStatus.text === "Izin";
  const isSakit = todayStatus.text === "Sakit";

  const showCheckInButton = !loading && (!summaryData?.status || summaryData.status === "-" || todayStatus.text === "Belum Tercatat");
  const hasCheckIn = !loading && summaryData?.today_check_in && summaryData.today_check_in !== "-";

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
            className={loading ? "bg-gray-100" : todayStatus.class}
          >
            {loading ? "-" : todayStatus.text}
          </Badge>
        </div>
        <div className='flex justify-between'>
          <h1>Check In:</h1>
          <h1 className='font-semibold'>
            {loading ? "-" : summaryData?.today_check_in ?? "-"}
          </h1>
        </div>
      </div>

      {loading ? (
        <DisabledButton message="Loading..." />
      ) : (
        <>
          {isAlfa && (
            <DisabledButton message="Maaf, Anda Alfa Hari Ini!!" />
          )}

          {isIzin && (
            <DisabledButton message="Besok harus berangkat yaa.." />
          )}

          {isSakit && (
            <DisabledButton message="Semoga lekas sembuh yaa.." />
          )}

          {!isAlfa && showCheckInButton && (
            <CheckInButton message="Silakan Absen" />
          )}

          {hasCheckIn && (
            <DisabledButton message="Besok masuk lagi yaa!" />
          )}
        </>
      )}
    </div>
  );
}
