"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, MinusCircle } from "lucide-react"

type PresensiStatus = "hadir" | "sakit" | "izin" | "alfa"

interface PresensiInfoProps {
  status: PresensiStatus
}

export const AttendanceInfo: React.FC<PresensiInfoProps> = ({ status }) => {
  const getStatusInfo = (status: PresensiStatus) => {
    switch (status) {
      case "hadir":
        return {
          label: "Anda sudah presensi (Hadir)",
          color: " text-green-700",
          icon: <CheckCircle className="w-15 md:w-20 h-15 md:h-20 text-green-600" />,
        }
      case "sakit":
        return {
          label: "Anda sudah presensi (Sakit)",
          color: " text-yellow-700",
          icon: <AlertCircle className="w-15 md:w-20 h-15 md:h-20 text-yellow-600" />,
        }
      case "izin":
        return {
          label: "Anda sudah presensi (Izin)",
          color: " text-blue-700",
          icon: <MinusCircle className="w-15 md:w-20 h-15 md:h-20 text-blue-600" />,
        }
      case "alfa":
      default:
        return {
          label: "Anda tidak presensi (Alfa)",
          color: " text-red-700",
          icon: <XCircle className="w-15 md:w-20 h-15 md:h-20 text-red-600" />,
        }
    }
  }

  const info = getStatusInfo(status)

  return (
    <Card className="flex w-full rounded-md">
      <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
        {info.icon}
        <p className={info.color + " px-3 py-1 text-lg md:text-2xl text-center font-bold"}>
          {info.label}
        </p>
      </CardContent>
    </Card>
  )
}
