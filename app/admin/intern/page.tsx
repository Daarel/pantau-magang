import { Suspense } from "react";
import AdminInternClient from "./components/AdminInternClient";
import Loading from "./loading";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDateID } from "@/lib/helper/formatDate.helper";
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
    .select(
      `id, nomor_induk, full_name, department, email, auth_id, supervisor_id, supervisor:supervisor_id (
  id,
  auth_id,
  full_name,
  nomor_induk
), intern_start_date, intern_end_date, institution, status`,
      { count: "exact" }
    )
    .eq("role", "intern")
    .order("full_name", { ascending: sort === "asc" })
    .range(offset, offset + pageSize - 1);

  if (errorGetData) {
    console.error("Error fetching user data:", errorGetData);
    toast.error("Gagal mendapatkan data anak magang");
  }

  const flatData = (data ?? []).map((user: any) => ({
    ...user,
    auth_id: user.auth_id ?? null,
    supervisor_name: user.supervisor?.full_name ?? "-",
    formattedStartIntern: formatDateID(user.intern_start_date),
    formattedEndIntern: formatDateID(user.intern_end_date),
  }));

  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-gray-50 p-6 overflow-x-hidden'>
        <AdminInternClient
          tableData={flatData ?? []}
          totalCount={count ?? 0}
          pageSize={pageSize}
          currentPage={page}
          sort={sort}
        />
      </div>
    </Suspense>
  );
}
