import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { AttendanceIntern } from "@/types/attendance";

export function internAttendanceData(activeTab: string) {
  const [attendanceData, setAttendanceData] = useState<AttendanceIntern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dapatkan user data dari localStorage
        const userDataString = localStorage.getItem("user");

        if (!userDataString) {
          setError("User data not found in localStorage");
          setLoading(false);
          return;
        }

        // Parse data user
        const userData = JSON.parse(userDataString);
        const user_id = userData.id;

        if (!user_id) {
          setError("User ID not found in user data");
          setLoading(false);
          return;
        }

        // Query data dari Supabase berdasarkan user_id
        let query = supabase
          .from("attendance")
          .select("*")
          .eq("user_id", user_id);

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
  }, [activeTab]);

  return { attendanceData, loading, error };
}
