import React from "react";
// Icons
import { GoClock } from "react-icons/go";
import { Badge } from "@/components/ui/badge";
// Components
import { CheckOutModal } from "@/components/CheckOutModal"
import { useDashboardData } from '@/hooks/useDashboardData'
import { statusColor } from '@/lib/utils';
import { CheckInButton, DisabledButton } from "./AttendanceButtonHandler";

export default function TodaysAttendance() {
  const { summaryData, loading, error } = useDashboardData()

  const status = loading ? "-" : summaryData?.status ?? "-"
  const todayStatus = statusColor(status)
  const isAlfa = todayStatus.text === "Alfa";
  const isIzin = todayStatus.text === "Izin";
  const isSakit = todayStatus.text === "Sakit";
  const isIzinOrSakit = isIzin || isSakit;

  const showCheckInButton = !loading && (!summaryData?.status || summaryData.status === "-" || todayStatus.text === "Belum Tercatat");
  const hasCheckOut = !loading && summaryData?.today_check_out && summaryData.today_check_out !== "-";

  return (
    <div className='flex flex-col w-full md:w-1/2 border-2 gap-6 py-4 px-5 rounded-md'>
      {/* Header */}
      <div className='flex items-center justify-center gap-3'>
        <GoClock className='text-blue-500 w-6 h-6' />
        <h4 className='h4 font-semibold'>Presensi Hari Ini</h4>
      </div>

      {/* Status */}
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h1>Status:</h1>
          <Badge variant="default" className={loading ? "bg-gray-100" : todayStatus.class}>{loading ? "-" : todayStatus.text}</Badge>
        </div>
        <div className='flex justify-between'>
          <h1>Check In:</h1>
          <h1 className='font-semibold'>{loading ? "-" : summaryData?.today_check_in ?? "-"}</h1>
        </div>
        <div className='flex justify-between'>
          <h1>Check Out:</h1>
          <h1 className='font-semibold'>{loading ? "-" : summaryData?.today_check_out ?? "-"}</h1>
        </div>
      </div>

      {loading ? (
        DisabledButton("Loading...")
      ) : (
        <>
          {isAlfa && (
            DisabledButton("yahahahhaha gabisa absen awokaowkawok😂😂😂")
          )}

          {isIzin && (
            DisabledButton("Besok harus berangkat!!")
          )}

          {isSakit && (
            DisabledButton("Semoga lekas sembuh yaa!!😁👍")
          )}

          {!isAlfa && showCheckInButton && (
            CheckInButton("Silakan Absen Masuk")
          )}

          {/* Tidak menampilkan Button Checkout ketika Status Alfa, Izin, Sakit, dan setelah melakukan Checkout */}
          {!isAlfa && !isIzinOrSakit && !showCheckInButton && !hasCheckOut && <CheckOutModal />}

          {hasCheckOut && (
            DisabledButton("Besok masuk lagi yaa!")
          )}
        </>
      )}

    </div>
  );
}
