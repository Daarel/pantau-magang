import { useState, useEffect } from 'react'
import { getAttendanceByUser } from '@/lib/queries'

export default function useAttendance(userId) {
  const [data, setData] = useState([])

  useEffect(() => {
    if (!userId) return
    getAttendanceByUser(userId).then(res => {
      if (!res.error) setData(res.data)
    })
  }, [userId])

  return data
}
