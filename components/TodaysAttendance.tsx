'use client'
import { useEffect, useRef } from "react";
// Icons
import { GoClock } from "react-icons/go";
import { Badge } from "@/components/ui/badge";
// Components
import { useInternData } from '@/hooks/useInternData'
import { useInsertAlfa } from '@/hooks/useAttendance';
import { statusColor } from '@/lib/utils';
import { CheckInButton, DisabledButton } from "./AttendanceButtonHandler";
import RealtimeDashboardRefresher from "@/components/RealtimeDashboardRefresher";

export default function TodaysAttendance() {
  const { summaryData, loading, error } = useInternData();
  const { checkAndInsertAlfaStatus, error: alfaError } = useInsertAlfa();

  const status = loading ? "-" : summaryData?.status ?? "-";
  const todayStatus = statusColor(status);
  const isAlfa = todayStatus.text === "Alfa";
  const isIzin = todayStatus.text === "Izin";
  const isSakit = todayStatus.text === "Sakit";
  const hasInsertedAlfaRef = useRef(false);

  const showCheckInButton = !loading && (!summaryData?.status || summaryData.status === "-" || todayStatus.text === "Belum Tercatat");
  const hasCheckIn = !loading && summaryData?.today_check_in && summaryData.today_check_in !== "-";

  useEffect(() => {
    if (alfaError) console.error("Error inserting alfa status:", alfaError);

    if (!loading && summaryData?.user_id && !summaryData?.status && !hasInsertedAlfaRef.current) {
      checkAndInsertAlfaStatus();
      hasInsertedAlfaRef.current = true; // tandai sudah insert alfa hari ini
    }
  }, [loading, summaryData?.user_id, summaryData?.status, alfaError, checkAndInsertAlfaStatus]);

  // if (loading) {
  //   return (
  //     <div className='flex flex-col border-2 gap-6 py-4 px-5 rounded-md'>
  //       <div className='flex items-center justify-center gap-3'>
  //         <GoClock className='text-blue-500 w-6 h-6' />
  //         <h4 className='h4 font-semibold'>Presensi Hari Ini</h4>
  //       </div>
  //       <DisabledButton message="Loading..." />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className='flex flex-col border-2 gap-6 py-4 px-5 rounded-md'>
  //       <div className='flex items-center justify-center gap-3'>
  //         <GoClock className='text-blue-500 w-6 h-6' />
  //         <h4 className='h4 font-semibold'>Presensi Hari Ini</h4>
  //       </div>
  //       <div className="text-red-500 text-center">Error: {error}</div>
  //     </div>
  //   );
  // }

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
            <DisabledButton message="Tidak hadir tanpa keterangan" />
          )}

          {isIzin && (
            <DisabledButton message="Izin tidak hadir" />
          )}

          {isSakit && (
            <DisabledButton message="Tidak hadir karena sakit" />
          )}

          {!isAlfa && showCheckInButton && (
            <CheckInButton message="Silakan lakukan absensi" />
          )}

          {hasCheckIn && (
            <DisabledButton message="Telah melakukan absensi" />
          )}
        </>
      )}
      <RealtimeDashboardRefresher />
    </div>
  );
}
