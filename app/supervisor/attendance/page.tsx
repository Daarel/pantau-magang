import AttendanceClient from "@/app/supervisor/attendance/component/AttendanceClient";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60

export default async function AttendancePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching supervisor data:", error);
    redirect("/");
  }

  return <AttendanceClient supervisorId={data.id} />;
}
