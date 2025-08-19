import { useState, useEffect } from 'react'
import { getAttendanceByUser } from '@/app/lib/queries'

interface Attendance {
  id: number
  date: string
  status: string
}

export default function useAttendance(userId: number) {
  const [data, setData] = useState<Attendance[]>([])

  useEffect(() => {
    if (!userId) return

    getAttendanceByUser(userId).then((res) => {
      if (!res.error && res.data) {
        setData(res.data)
      }
    })
  }, [userId])

  return data
}
