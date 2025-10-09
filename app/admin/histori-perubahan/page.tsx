import { Suspense } from "react";
import AdminHistoryClient from "./components/AdminHistoryClient";
import Loading from "../loading";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDateID } from "@/lib/helper/formatDate.helper";

export default async function AdminHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata.role !== "admin") {
    redirect("/");
  }

  const { data, error: errorGetData } = await supabase
    .from("activity_logs")
    .select("id, full_name, action_type, description, target_name, created_at")
    .order("created_at", { ascending: false });

  if (errorGetData) {
    console.error("Error fetching", errorGetData);
  }

  const flatData = (data ?? []).map((user: any) => ({
    ...user,
    created_at: formatDateID(user.created_at),
  }));

  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-gray-50 p-6 overflow-x-hidden'>
        <AdminHistoryClient tableData={flatData ?? []} />
      </div>
    </Suspense>
  );
}
