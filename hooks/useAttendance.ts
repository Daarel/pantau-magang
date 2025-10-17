import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { AttendanceIntern, AttendanceCheckIn } from "@/types/attendance";
import { toast } from "sonner";
import { getUserData } from "@/lib/utils";

// Fetch data user (intern)
export function useAttendanceData(activeTab: string) {
  const [attendanceData, setAttendanceData] = useState<AttendanceIntern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(supabase);

        // Query data attendance berdasarkan user_id
        let query = supabase
          .from("attendance")
          .select("*")
          .eq("user_id", userData.id);

        // Filter berdasarkan tab aktif jika bukan "Semua Riwayat"
        if (activeTab !== "Semua Riwayat") {
          // Mapping antara tab dan status
          const statusMap: Record<string, string> = {
            Hadir: "hadir",
            Sakit: "sakit",
            Izin: "izin",
            Alfa: "alfa",
          };

          const status = statusMap[activeTab];
          if (status) {
            query = query.eq("status", status);
          }
        }

        const { data, error } = await query.order("date", { ascending: false });

        if (error) {
          setError(`Error fetching attendance data: ${error.message}`);
          console.error("Error fetching attendance data:", error);
        } else {
          // Transformasi data untuk memastikan konsistensi dengan tipe AttendanceIntern
          const transformedData = data.map((item) => ({
            ...item,
            notes: item.notes || "-",
            file_url: item.file_url || "-",
          })) as AttendanceIntern[];

          setAttendanceData(transformedData);
          setError(null);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, supabase]);

  return { attendanceData, loading, error };
}

// Simpan informasi presensi user ke database
export const InsertAttendanceIntern = async (
  attendanceData: AttendanceCheckIn
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("attendance")
    .insert([
      {
        user_id: attendanceData.user_id,
        status: attendanceData.status,
        date: attendanceData.date,
        check_in_time: attendanceData.check_in_time,
        notes: attendanceData.notes,
        file_url: attendanceData.file_url,
        dispensation: attendanceData.dispensation,
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

// Cek dan insert status alfa jika belum absen setelah end_time
export const InsertAlfaStatus = async() => {
  const supabase = createClient();
  try {
    const userData = await getUserData(supabase);

    // Dapatkan jadwal dari supervisor
    const { data: schedule, error: scheduleError } = await supabase
      .from("attendance_schedules")
      .select("start_time, end_time")
      .eq("supervisor_id", userData.supervisor_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (scheduleError) {
      console.error("Error fetching schedule:", scheduleError);
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    const now = new Date();
    
    // Parse end_time dari schedule
    const [hours, minutes, seconds] = schedule.end_time.split(':');
    const endTimeToday = new Date();
    endTimeToday.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds), 0);

    // Cek apakah sudah melewati end_time hari ini
    if (now > endTimeToday) {
      // Cek apakah user sudah memiliki record attendance untuk hari ini
      const { data: existingAttendance, error: checkError } = await supabase
        .from("attendance")
        .select("id")
        .eq("user_id", userData.id)
        .eq("date", today)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error("Error checking existing attendance:", checkError);
        return;
      }

      // Jika tidak ada record attendance untuk hari ini, insert status alfa
      if (!existingAttendance) {
        const { data, error: insertError } = await supabase
          .from("attendance")
          .insert([
            {
              user_id: userData.id,
              date: today,
              check_in_time: null,
              status: "alfa",
              notes: null,
              file_url: null,
              dispensation: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select();

        if (insertError) {
          console.error("Error inserting auto absent:", insertError);
        } else {
          console.log("Auto absent inserted successfully:", data);
          return data;
        }
      }
    }
  } catch (error) {
    console.error("Error in InsertAutoAbsent:", error);
    throw error;
  }
}

// Hook untuk mengecek dan insert auto absent
export function useInsertAlfa() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAndInsertAlfaStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await InsertAlfaStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { checkAndInsertAlfaStatus, loading, error };
}

export const useScheduleSupervisor = () => {
  const [schedule, setSchedule] = useState<{ start_time: string; end_time: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient(); 
  
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const userData = await getUserData(supabase);
        const { data, error } = await supabase
          .from("attendance_schedules")
          .select("start_time, end_time")
          .eq("supervisor_id", userData.supervisor_id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();
        if (error) {
          setError(`Error fetching schedule: ${error.message}`);
          console.error("Error fetching schedule:", error);
        } else {
          setSchedule(data);
          setError(null);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [supabase]);

  return { schedule, loading, error };
}