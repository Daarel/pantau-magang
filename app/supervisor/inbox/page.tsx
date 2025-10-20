import SupervisorInboxClient from "@/app/supervisor/inbox/component/SupervisorInboxClient";

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

  return <SupervisorInboxClient supervisorId={data.id} />;
}
