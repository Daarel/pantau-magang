

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StartButton from "./components/startbutton";
import RealtimeDashboardRefresher from "@/components/RealtimeDashboardRefresher";
import AnimatedInternList from "./components/AnimatedInternList";
import BackButton from "@/components/BackButton";

export const revalidate = 60;

export default async function InternProfilePage() {
  const supabase = await createClient();

  // Cek user login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  // Ambil supervisor id
  const { data: supervisorData, error: supervisorError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (supervisorError || !supervisorData) {
    console.error("Error fetching supervisor data:", supervisorError);
    redirect("/");
  }

  // Ambil daftar interns
  const { data: interns, error: internsError } = await supabase
    .from("users")
    .select(
      "id, full_name, nomor_induk, institution, role, intern_start_date, intern_end_date, photo_url, status"
    )
    .eq("role", "intern")
    .eq("supervisor_id", supervisorData.id);

  if (internsError) {
    console.error("Error fetching interns:", internsError);
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Tombol kembali */}
      <div className="mb-10">
        <BackButton />
      </div>

      {/* Header dan tombol mulai */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Daftar Intern Anda
          </h1>
          <p className="text-gray-500 normal-case">
            Profil peserta magang di bawah pengawasan
          </p>
        </div>

        {/* Tombol mulai (opsi 1) */}
        <StartButton />
      </div>

      {/* Kalau belum ada intern */}
      {(!interns || interns.length === 0) ? (
        <p className="text-gray-600 italic">Belum ada intern yang terdaftar.</p>
      ) : (
        <AnimatedInternList interns={interns} />
      )}

      <RealtimeDashboardRefresher />
    </div>
  );
}
