import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { internSummary } from '@/types/dashboard'
import { formatTime } from "@/lib/utils"

export function internDashboardSummary(){
  const [summaryData, setSummaryData] = useState<internSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dapatkan user data dari localStorage
        const userDataString = localStorage.getItem('user')

        if (!userDataString){
          setError('User data not found in localStorage')
          setLoading(false)
          return
        }

        // Parse data user
        const userData = JSON.parse(userDataString)
        const user_id = userData.id

        if (!user_id) {
          setError('User ID not found in user data')
          setLoading(false)
          return
        }

        // Query data dari Supabase berdasarkan user_id
        const { data, error } = await supabase
          .from('intern_dashboard')
          .select('*')
          .eq('user_id', user_id)
          .single()

        if (error) {
          setError(error.message)
          setLoading(false)
          return
        }

        if(data) {
          const formatted = {
            ...data,
            start_time: formatTime(data.start_time),
            end_time: formatTime(data.end_time),
          }
          setSummaryData(formatted as internSummary)
        }
        
        setLoading(false)
      } 
      catch {
        setError("Unexpected error occurred")
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  
  return { summaryData, loading, error }
}