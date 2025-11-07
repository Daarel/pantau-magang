import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import TabNavigation from "./components/TabNavigation";
import Loading from "./components/loading"
import { AttendanceIntern } from "@/types/attendance";
import { redirect } from "next/navigation";

async function checkAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function getUserData(userId: string | null) {
  const supabase = await createClient();

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", userId)
    .single();

  if (!userData) {
    console.warn("User belum login");
    return null;
  }
  return userData;
}

async function getAttendanceData(activeTab: string, userId: string): Promise<AttendanceIntern[]> {
  const supabase = await createClient();

  let query = supabase
    .from("attendance")
    .select("*")
    .eq("user_id", userId);

  // Filter berdasarkan tab aktif jika bukan "Semua Riwayat"
  if (activeTab !== "Semua Riwayat") {
    // Mapping antara tab dan status
    const statusMap: Record<string, string> = {
      Hadir: "hadir",
      Sakit: "sakit",
      Izin: "izin",
      Alfa: "alfa",
    };

    const status = statusMap[activeTab];
    if (status) {
      query = query.eq("status", status);
    }
  }

  const { data, error } = await query.order("date", { ascending: false });

  if (error) {
    console.error("Error fetching attendance data:", error);
    return [];
  }
  
  // Transformasi data untuk memastikan konsistensi dengan tipe AttendanceIntern
  const transformedData = data.map((item) => ({
    ...item,
    notes: item.notes || "-",
    file_url: item.file_url || "-",
  })) as AttendanceIntern[];

  return transformedData;
};

export default async function InternHistory() {
  const user = await checkAuth();
  if (!user) {
    redirect("/");
  }

  const userData = await getUserData(user.id);
  const tabs = ["Semua Riwayat", "Hadir", "Sakit", "Izin", "Alfa"];
  const tabDataPromises = tabs.map(tab => 
    getAttendanceData(tab, userData.id)
  );
  const tabDataResults = await Promise.all(tabDataPromises);
  
  // Gabungkan data tab dengan nama tab
  const tabData = tabs.map((tabName, index) => ({
    tabName,
    data: tabDataResults[index]
  }));

  return (
    <div className='flex flex-col min-h-screen gap-4'>
      {/* Header */}
      <div>
        <h1 className='h4 font-semibold'>Riwayat Kehadiran</h1>
        <p className='text-gray-500 text-[12px] md:text-[16px]'>
          Lacak catatan dan pola kehadiran Anda
        </p>
      </div>

      {/* Tabs */}
      <Suspense fallback={<Loading />}>
        <TabNavigation 
          tabData={tabData}
        />
      </Suspense>
    </div>
  );
}
