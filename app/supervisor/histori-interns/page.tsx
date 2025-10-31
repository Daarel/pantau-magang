import { createClient } from "@/lib/supabase/server";
import SupervisorHistoryClient from "@/app/supervisor/histori-interns/components/SupervisorHistoryClient";

export default async function Page() {
  const supabase = await createClient();

  // 🧠 Ambil user yang sedang login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-center text-gray-500">User belum login</p>;
  }

  // 🧱 Ambil ID supervisor
  const { data: supervisorProfile } = await supabase
    .from("users")
    .select("id")
    .eq("email", user.email)
    .single();

  if (!supervisorProfile) {
    return <p className="text-center text-gray-500">Supervisor tidak ditemukan</p>;
  }

  // 📦 Ambil data intern di bawah supervisor
  const { data } = await supabase
    .from("users")
    .select(
      "id, nomor_induk, full_name, status, institution, intern_start_date, intern_end_date, supervisor_id"
    )
    .eq("role", "intern")
    .eq("supervisor_id", supervisorProfile.id);

  const today = new Date();
  const formattedData =
    data?.map((intern: any) => {
      const startDate = intern.intern_start_date
        ? new Date(intern.intern_start_date).toLocaleDateString("id-ID")
        : "Tanggal Tidak Diketahui";

      const endDate = intern.intern_end_date
        ? new Date(intern.intern_end_date).toLocaleDateString("id-ID")
        : "Tanggal Tidak Diketahui";

      let status = "Status Tidak Diketahui";

      if (
        intern.status === "active" ||
        (intern.intern_end_date && new Date(intern.intern_end_date) > today)
      ) {
        status = `Sedang magang dari ${startDate} hingga ${endDate}`;
      } else if (
        intern.status === "inactive" ||
        (intern.intern_end_date && new Date(intern.intern_end_date) <= today)
      ) {
        status = `Selesai magang pada ${endDate}`;
      }

      return {
        id: intern.id,
        nomor_induk: intern.nomor_induk ?? "-",
        full_name: intern.full_name ?? "Tanpa Nama",
        institutions: intern.institution ?? "-",
        status,
      };
    }) ?? [];

  // 🔁 Kirim ke komponen client
  return <SupervisorHistoryClient data={formattedData} />;
}
