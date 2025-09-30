import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  FaUserGraduate,
  FaUniversity,
  FaRegCalendarAlt,
  FaIdBadge,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default async function InternProfilePage() {
  const supabase = await createClient();

  // cek user login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // ambil supervisor id
  const { data: supervisorData, error: supervisorError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (supervisorError || !supervisorData) {
    console.error("Error fetching supervisor data:", supervisorError);
    redirect("/");
  }

  // ambil daftar interns
  const { data: interns, error: internsError } = await supabase
    .from("users")
    .select(
      "id, full_name, nomor_induk, institution, role, intern_start_date, intern_end_date, photo_url "
    )
    .eq("role", "intern")
    .eq("supervisor_id", supervisorData.id);

  if (internsError) {
    console.error("Error fetching interns:", internsError);
  }

  // helper sisa hari
  const calculateRemainingWeekdays = (end: string | null) => {
    if (!end) return null;

    const today = new Date();
    const endDate = new Date(end);

    let count = 0;
    const current = new Date(today);

    while (current <= endDate) {
      const day = current.getDay(); // 0 = Minggu, 6 = Sabtu
      if (day !== 0 && day !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back button */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/supervisor/dashboard"
          className="px-2 py-2 hover:bg-gray-200 rounded-full transition"
        >
          <IoArrowBackOutline className="text-2xl text-gray-700 hover:text-gray-900" />
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Intern Anda</h1>
        <p className="text-gray-500">
          Profil peserta magang di bawah pengawasan
        </p>
      </div>

      {/* Kalau belum ada intern */}
      {(!interns || interns.length === 0) && (
        <p className="text-gray-600 italic">Belum ada intern yang terdaftar.</p>
      )}

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {interns?.map((intern) => {
          const daysRemaining = calculateRemainingWeekdays(intern.intern_end_date);

          return (
            <Card
              key={intern.id}
              className={`rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ${
                daysRemaining === 0 ? "bg-red-50" : "bg-white"
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between gap-4">
                {/* 🔹 Kiri: Foto + Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar (fallback huruf awal) */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-blue-100 text-blue-700 font-semibold ring-2 ring-gray-200">
                    {intern.photo_url ? (
                      <Image
                        src={intern.photo_url}
                        alt={intern.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{intern.full_name?.charAt(0) || "?"}</span>
                    )}
                  </div>

                  {/* Info dasar */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-800">
                      {intern.full_name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaIdBadge className="text-gray-400" />{" "}
                      {intern.nomor_induk}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaUniversity className="text-gray-400" />{" "}
                      {intern.institution || "Tidak ada institusi"}
                    </p>
                  </div>
                </div>

                {/* 🔹 Kanan: Periode & Status */}
                <div className="text-right space-y-1">
                  <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                    <FaRegCalendarAlt className="text-gray-400" />
                    {intern.intern_start_date
                      ? new Date(intern.intern_start_date).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "?"}{" "}
                    -{" "}
                    {intern.intern_end_date
                      ? new Date(intern.intern_end_date).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "?"}
                  </p>

                  {daysRemaining !== null && (
                    <p
                      className={`text-sm font-medium flex items-center gap-1 justify-end ${
                        daysRemaining === 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {daysRemaining === 0 ? (
                        <>
                          <FaCheckCircle className="text-red-600" /> Selesai
                        </>
                      ) : (
                        <>
                          <FaHourglassHalf className="text-green-600" />{" "}
                          {daysRemaining} hari lagi
                        </>
                      )}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
