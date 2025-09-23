import { Suspense } from "react";
import AdminInternClient from "./components/AdminInternClient";
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

  const { data, error: errorGetData } = await supabase
    .from("users")
    .select(
      `id, nomor_induk, full_name, department, email, supervisor:supervisor_id (
  id,
  full_name
), intern_start_date, intern_end_date, institution`
    )
    .eq("role", "intern");
  if (errorGetData) {
    console.error("Error fetching user data:", errorGetData);
  }

  const flatData = (data ?? []).map((user: any) => ({
    ...user,
    supervisor_name: user.supervisor?.full_name ?? "-",
  }));

  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-gray-50 p-6 overflow-x-auto'>
        <AdminUserClient tableData={flatData ?? []} />
      </div>
    </Suspense>
  );
}
