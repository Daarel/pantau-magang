import { Suspense } from "react";
import AdminSupervisorClient from "./components/AdminSupervisorClient";
import Loading from "../../loading";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { toast } from "sonner";

export const revalidate = 60

export default async function AdminUserPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata.role !== "admin") {
    redirect("/");
  }

  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const sort = Array.isArray(params.sort)
    ? params.sort[0]
    : params.sort ?? "asc";
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const {
    data,
    count,
    error: errorGetData,
  } = await supabase
    .from("users")
    .select("id, nomor_induk, full_name, email, department, auth_id, status", {
      count: "exact",
    })
    .eq("role", "supervisor")
    .order("full_name", { ascending: sort === "asc" })
    .range(offset, offset + pageSize - 1);

  if (errorGetData) {
    console.error("Error fetching user data:", errorGetData);
    toast.error("Gagal mendapatkan data supervisor");
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-gray-50 p-6 overflow-x-hidden'>
        <AdminSupervisorClient
          tableData={data ?? []}
          totalCount={count ?? 0}
          pageSize={pageSize}
          currentPage={page}
          sort={sort}
        />
      </div>
    </Suspense>
  );
}
