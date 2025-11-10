import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
// Components
import DashboardContent from "./components/DashboardContent";
import Loading from "./loading";
import { formatTimeStamp, formatTime } from "@/lib/utils";
import { internSummary, internSchedule, internAttendance } from "@/types/intern";

async function checkAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function getInternData(userId: string | null) {
  const supabase = await createClient();

  const { data: userData } = await supabase
    .from("users")
    .select("id, supervisor_id")
    .eq("auth_id", userId)
    .single();

  // console.log("userData:", userData)
  if (!userData) return null;

  // Kueri berdasarkan user_id
  const { data: internData } = await supabase
    .from("intern_data")
    .select("*")
    .eq("user_id", userData.id)
    .single();

  // console.log("internData:", internData)
  return internData;
}

async function getAttendanceData(userId: string | null) {
  const supabase = await createClient();

  const { data: userData } = await supabase
    .from("users")
    .select("id, supervisor_id")
    .eq("auth_id", userId)
    .single();

  // console.log("userData:", userData)
  if (!userData) return null;

  const today = new Date().toISOString().split('T')[0];

  // Kueri berdasarkan user_id dan tanggal hari ini
  const { data: attendanceData } = await supabase
    .from("attendance")
    .select("user_id, status, check_in_time")
    .eq("user_id", userData.id)
    .eq("date", today)
    .single();

  // console.log("attendanceData:", attendanceData)
  return attendanceData;
}

async function getSecheduleData(supervisorId: string) {
  const supabase = await createClient();

  const { data: scheduleData } = await supabase
    .from("attendance_schedules")
    .select("*")
    .eq("supervisor_id", supervisorId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // console.log("scheduleData:",scheduleData)
  return scheduleData;
}

export default async function InternDashboard() {
  const user = await checkAuth();
  // console.log(user)

  if (!user) {
    redirect("/");
  }

  const internData = await getInternData(user.id);
  const attendanceData = await getAttendanceData(user.id);
  console.log("attendanceData berdasarkan ID user:", attendanceData)

  if (!internData) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='h4 font-semibold'>Data Tidak Ditemukan</h1>
          <p className='text-gray-600'>Tidak dapat memuat data dashboard</p>
        </div>
      </div>
    );
  }

  // const formattedData: internSummary = {
  //   ...internData,
  //   today_check_in: formatTimeStamp(internData.today_check_in),
  // };
  const formattedData: internAttendance = {
    user_id: attendanceData?.user_id,
    status: attendanceData?.status,
    check_in_time: attendanceData?.check_in_time ? formatTimeStamp(attendanceData?.check_in_time) : null,
  };

  const scheduleData = await getSecheduleData(internData.supervisor_id);

  const formattedSchedule: internSchedule | null = scheduleData
    ? {
        start_time: formatTime(scheduleData.start_time),
        end_time: formatTime(scheduleData.end_time),
      }
    : null;

  return (
    <Suspense fallback={Loading()}>
      <DashboardContent
        internData={internData}
        scheduleData={formattedSchedule}
        attendanceData={formattedData}
      />
      {/* Loading() */}
    </Suspense>
  );
}
