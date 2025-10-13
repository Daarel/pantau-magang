import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { internSchedule, internSummary } from "@/types/intern";
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

        if (internData) {
          const formatted = {
            ...internData,
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

export function useInternSchedule() {
  const [scheduleData, setScheduleData] = useState<internSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dapatkan user data dari supabase.auth
        const {
          data: { user }, error: userError,
        } = await supabase.auth.getUser();

        // console.log("👤 Auth user:", user);
        // console.log("❌ Auth error:", userError);

        if (!user) {
          redirect("/");
        }

        const { data, error: errorGetUser } = await supabase
          .from("users")
          .select("id, supervisor_id")
          .eq("auth_id", user.id)
          .single();
        
        // console.log("📋 User data from users table:", data);
        // console.log("❌ User query error:", errorGetUser);

        if (errorGetUser || !data) {
          // console.error("Error fetching intern data:", errorGetUser);
          redirect("/");
        }

        // console.log("🎯 Supervisor ID to query:", data.supervisor_id);

        // Query data dari Supabase berdasarkan user_id
        const { data: schedules, error, count } = await supabase
          .from("attendance_schedules")
          .select("*")
          .eq("supervisor_id", data.supervisor_id)
          .order("created_at", { ascending: false })
          .limit(1);
        
        // console.log("📊 Schedule query result:", schedules);
        // console.log("❌ Schedule query error:", error);
        // console.log("🔢 Total schedules found:", count);

        if (error) {
          // console.error("Error fetching schedule:", error);
          setError(error.message);
          setLoading(false);
          return;
        }

        // console.log("Raw data from Supabase:", schedules);

        if (schedules && schedules.length > 0) {
          // console.log("✅ Schedule found, formatting data...");
          const formatted = {
            start_time: formatTime(schedules[0].start_time),
            end_time: formatTime(schedules[0].end_time),
          };
          console.log("📅 Formatted schedule:", formatted);
          setScheduleData(formatted as internSchedule);
        } else {
          // console.warn("⚠️ No schedule found for supervisor_id:", data.supervisor_id);
          setError("No schedule found");
        }

        setLoading(false);
      } catch { 
        // console.error("💥 Unexpected error:", error);
        setError("Unexpected error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { scheduleData, loading, error };
}