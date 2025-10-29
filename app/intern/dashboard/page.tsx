import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
// Components
import DashboardContent from "./components/DashboardContent" 
import Loading from "./loading";
import { formatTimeStamp, formatTime } from "@/lib/utils";
import { internSummary } from "@/types/intern";

async function checkAuth() {
  const supabase = await createClient();
  const { data: { user }, } = await supabase.auth.getUser();
  return user;
}

async function getInternData(userId: string | null) {
  const supabase = await createClient();

  const { data: userData } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", userId)
    .single();

  if (!userData) return null;

  // Kueri berdasarkan user_id
  const { data: internData } = await supabase
    .from("intern_data")
    .select("*")
    .eq("user_id", userData.id)
    .single();
  
  return internData;
}

export default async function InternDashboard() {
  const user = await checkAuth()
  console.log(user)

  if(!user){
    redirect("/");
  }

  const internData = await getInternData(user.id)

  if (!internData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="h4 font-semibold">Data Tidak Ditemukan</h1>
          <p className="text-gray-600">Tidak dapat memuat data dashboard</p>
        </div>
      </div>
    );
  }

  const formattedData: internSummary = {
    ...internData,
    today_check_in: formatTimeStamp(internData.today_check_in),
  };

  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent internData={formattedData} />
    </Suspense>
  );
}