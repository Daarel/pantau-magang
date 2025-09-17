import { Suspense } from "react";
import AdminUserClient from "./components/AdminUserClient";
import Loading from "../loading";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminUserPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata.role !== "admin") {
    redirect("/");
  }

  const { data, error: errorGetData } = await supabase.from("users")
    .select(`id, nomor_induk, full_name, password, department, users!inner (
    full_name,
    supervisor_id
  ), intern_start_date, intern_end_date`);

  if (errorGetData) {
    console.error("Error fetching user data:", errorGetData);
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-gray-50 p-6'>
        <AdminUserClient tableData={data ?? []} />
      </div>
    </Suspense>
  );
}
