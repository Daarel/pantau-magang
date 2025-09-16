import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { internSummary } from '@/types/dashboard'
import { formatTimeStamp, formatTime } from "@/lib/utils"
import { redirect } from "next/navigation";

export function useDashboardData() {
  const [summaryData, setSummaryData] = useState<internSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dapatkan user data dari supabase.auth
        const {
          data: { user },
        } = await supabase.auth.getUser();
      
        if (!user) {
          redirect("/");
        }

        const { data, error: errorGetUser } = await supabase
          .from("users")
          .select("id")
          .eq("email_auth", user.id)
          .single();
      
        if (errorGetUser || !data) {
          console.error("Error fetching intern data:", errorGetUser);
          redirect("/");
        }

        // Query data dari Supabase berdasarkan user_id
        const { data: dashboardData, error } = await supabase
          .from("intern_dashboard")
          .select("*")
          .eq("user_id", data.id)
          .single();

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        console.log("Raw data from Supabase:", dashboardData)
        console.log("Raw start_time:", dashboardData?.start_time, "Type:", typeof dashboardData?.start_time)
        console.log("Raw end_time:", dashboardData?.end_time, "Type:", typeof dashboardData?.end_time)

        if (dashboardData) {
          const formatted = {
            ...dashboardData,
            start_time: formatTime(dashboardData.start_time),
            end_time: formatTime(dashboardData.end_time),
            today_check_in: formatTimeStamp(dashboardData.today_check_in),
            today_check_out: formatTimeStamp(dashboardData.today_check_out),
          };
          setSummaryData(formatted as internSummary);
        }

        setLoading(false);
      } catch {
        setError("Unexpected error occurred");
        setLoading(false);
      }
    };

    fetchData()
  }, [])
  
  return { summaryData, loading, error }
}