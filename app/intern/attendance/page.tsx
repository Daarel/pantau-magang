import { Suspense } from "react";
import { AttendanceForm } from "@/components/AttendanceForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatTime } from "@/lib/utils";
import { AttendanceInfo } from "@/components/AttendanceInfo"
import Loading from "./loading";
import { AiOutlineInfoCircle } from 'react-icons/ai';

async function checkAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function getUserData(userId: string) {
  const supabase = await createClient();

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", userId)
    .single();

  if (!userData) {
    console.warn("User belum login");
    return null;
  }
  return userData;
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

async function getAttendanceToday(userId: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: attendanceTodayData } = await supabase
    .from("attendance")
    .select("status")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  return attendanceTodayData;
}

export default async function Attendance() {
  const user = await checkAuth();

  if (!user) {
    redirect("/");
  }

  const userData = await getUserData(user.id);
  const scheduleData = await getSecheduleData(userData?.supervisor_id);
  const formattedStartTime = formatTime(scheduleData?.start_time);
  const formatteEndTime = formatTime(scheduleData?.end_time);
  const attendanceToday = await getAttendanceToday(userData.id);
  const attendanceStatus = attendanceToday?.status as "hadir" | "sakit" | "izin" | "alfa" | null;

  return (
    <Suspense fallback={Loading()}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h4 className='h4 font-semibold'>Konfirmasi Kehadiran</h4>
          </div>
          <div className="flex items-center gap-1 text-black/40 text-[12px] md:text-sm">
            <AiOutlineInfoCircle className="w-4 h-4" />
            <h6>
              Absensi dibuka pukul {formattedStartTime ?? ".. : .."} - {formatteEndTime ?? ".. : .."}
            </h6>
          </div>
        </div>
        {attendanceToday? (
          <AttendanceInfo status={attendanceStatus} />
        ) : (
          <AttendanceForm />
        )}
      </div>
    </Suspense>
  );
}
