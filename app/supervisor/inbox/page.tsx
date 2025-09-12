import SupervisorInboxClient from "@/app/supervisor/inbox/component/SupervisorInboxClient";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AttendancePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <SupervisorInboxClient supervisorId={user.id} />;
}
