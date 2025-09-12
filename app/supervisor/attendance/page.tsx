import AttendanceClient from "@/app/supervisor/attendance/component/AttendanceClient";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AttendancePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <AttendanceClient supervisorId={user.id} />;
}
