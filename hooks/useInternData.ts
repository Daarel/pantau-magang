import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { internSummary } from "@/types/intern";
import { formatTimeStamp, formatTime } from "@/lib/utils";
import { redirect } from "next/navigation";

export function useInternData() {
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
          .eq("auth_id", user.id)
          .single();

        if (errorGetUser || !data) {
          console.error("Error fetching intern data:", errorGetUser);
          redirect("/");
        }

        // Query data dari Supabase berdasarkan user_id
        const { data: internData, error } = await supabase
          .from("intern_data")
          .select("*")
          .eq("user_id", data.id)
          .single();

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        console.log("Raw data from Supabase:", internData);
        console.log(
          "Raw start_time:",
          internData?.start_time,
          internData?.end_time,
          "Type:",
          typeof internData?.start_time,
          typeof internData?.end_time
        );

        if (internData) {
          const formatted = {
            ...internData,
            start_time: formatTime(internData.start_time),
            end_time: formatTime(internData.end_time),
            today_check_in: formatTimeStamp(internData.today_check_in),
          };
          setSummaryData(formatted as internSummary);
        }

        setLoading(false);
      } catch { 
        setError("Unexpected error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { summaryData, loading, error };
}
