import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AttendanceIntern, AttendanceCheckIn } from '@/types/attendance'
import { string } from 'zod'

// Fetch data user (intern)
export function internAttendanceData(activeTab: string) {
  const [attendanceData, setAttendanceData] = useState<AttendanceIntern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
  }, [activeTab, supabase]);

  return { attendanceData, loading, error }
}

// Simpan informasi presensi user ke database
export const InsertAttendanceIntern = async (attendanceData: AttendanceCheckIn) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('attendance')
    .insert([{
      user_id: attendanceData.user_id,
      status: attendanceData.status,
      date: attendanceData.date,
      check_in_time: attendanceData.check_in_time,
      notes: attendanceData.notes,
      file_url: attendanceData.file_url,
      dispensation: attendanceData.dispensation,
    }])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

// Update data attendance untuk menambahkan data checkout intern
export const UpdateCheckOutTime = async (userId: string, date: string) => {
  try {
    // Dapatkan record attendance untuk user pada tanggal tertentu
    const { data: attendanceRecord, error: fetchError } = await supabase
      .from('attendance')
      .select('id')
      .eq('user_id', userId)
      .eq('date', date)
      .eq('status', 'hadir')
      .is('check_out_time', null)
      .single();

    if (fetchError) {
      throw new Error(`Tidak ditemukan data absensi masuk untuk hari ini: ${fetchError.message}`);
    }

    if (!attendanceRecord) {
      throw new Error('Tidak ditemukan data absensi masuk untuk hari ini');
    }

    // Update check_out_time
    const { data, error } = await supabase
      .from('attendance')
      .update({
        check_out_time: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', attendanceRecord.id)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating check-out time:', error);
    throw error;
  }
};