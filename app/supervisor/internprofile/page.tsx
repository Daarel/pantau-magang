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
      "id, full_name, nomor_induk, institution, role, intern_start_date, intern_end_date"
    )
    .eq("role", "intern")
    .eq("supervisor_id", supervisorData.id);

  if (internsError) {
    console.error("Error fetching interns:", internsError);
  }

  // helper sisa hari
  const calculateRemainingDays = (end: string | null) => {
    if (!end) return null;
    const today = new Date();
    const endDate = new Date(end);

    const daysRemaining = Math.max(
      0,
      Math.floor((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );

    return daysRemaining;
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
      <div className="grid gap-6">
        {interns?.map((intern) => {
          const daysRemaining = calculateRemainingDays(intern.intern_end_date);

          return (
            <Card
              key={intern.id}
              className="shadow-sm hover:shadow-md transition-all duration-200 rounded-xl"
            >
              <CardContent className="p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                {/* Info intern */}
                <div className="space-y-2">
                  <p className="font-semibold flex items-center gap-2 text-lg text-gray-800">
                    <FaUserGraduate className="text-blue-600" />
                    {intern.full_name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaIdBadge className="text-gray-500" />
                    {intern.nomor_induk}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaUniversity className="text-gray-500" />
                    {intern.institution || "Tidak ada institusi"}
                  </p>
                  {/* Periode */}
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaRegCalendarAlt className="text-gray-500" />
                    {intern.intern_start_date
                      ? new Date(intern.intern_start_date).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" }
                        )
                      : "Tanggal mulai tidak ada"}{" "}
                    -{" "}
                    {intern.intern_end_date
                      ? new Date(intern.intern_end_date).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" }
                        )
                      : "Tanggal selesai tidak ada"}
                  </p>
                  {/* Sisa hari */}
                  {daysRemaining !== null && (
                    <p
                      className={`text-sm font-medium mt-1 flex items-center gap-2 ${
                        daysRemaining === 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {daysRemaining === 0 ? (
                        <>
                          <FaCheckCircle className="text-red-600" /> Selesai
                        </>
                      ) : (
                        <>
                          <FaHourglassHalf className="text-green-600" /> Sisa{" "}
                          {daysRemaining} hari magang
                        </>
                      )}
                    </p>
                  )}
                </div>

                {/* Role Badge */}
                <span className="px-3 py-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 flex items-center gap-1 mt-4 sm:mt-0">
                  <MdWork className="text-blue-600" />
                  {intern.role}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
