import { Suspense } from "react";
import AdminHistoryClient from "./components/AdminHistoryClient";
import Loading from "../loading";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDateID } from "@/lib/helper/formatDate.helper";
import { toast } from "sonner";

export const revalidate = 60

export default async function AdminHistoryPage({
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
  const sort = Array.isArray(params.sort) ? params.sort[0] : params.sort ?? "asc";
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const {
    data,
    count,
    error: errorGetData,
  } = await supabase
    .from("activity_logs")
    .select(
      "id, full_name, action_type, description, target_name, created_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: sort === "asc" })
    .range(offset, offset + pageSize - 1);

  if (errorGetData) {
    console.error("Error fetching", errorGetData);
    toast.error("Gagal mendapatkan data");
  }

  const flatData = (data ?? []).map((user: any) => ({
    ...user,
    created_at: formatDateID(user.created_at),
  }));

  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen bg-gray-50 p-6 overflow-x-hidden'>
        <AdminHistoryClient
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
