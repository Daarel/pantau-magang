import SupervisorInboxClient from "@/app/supervisor/inbox/component/SupervisorInboxClient";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
    .eq("email_auth", user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching supervisor data:", error);
    redirect("/");
  }

  return <SupervisorInboxClient supervisorId={data.id} />;
}
