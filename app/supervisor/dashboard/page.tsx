import { GoClock, GoPeople } from "react-icons/go";
import { FiTrendingUp } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../../globals.css";
import Image from "next/image";
import DashboardClock from "@/components/DashboardClock";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { DashboardTable } from "@/components/tabel-supervisor/AttendanceTable";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function SupervisorDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  let totalInterns = 0;
  let presentToday = 0;
  let pendingLeaves = 0;
  let avgAttendance = 0;

  const { data, error: errorGetUser } = await supabase
    .from("users")
    .select("id")
    .eq("email_auth", user.id)
    .single();

  if (errorGetUser || !data) {
    console.error("Error fetching supervisor data:", errorGetUser);
    redirect("/");
  }

  // hitung total interns untuk supervisor ini
  const { count: internsCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "intern")
    .eq("supervisor_id", data.id);

  console.log("Interns Count:", internsCount);

  totalInterns = internsCount ?? 0;

  // ambil tanggal hari ini (lokal)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  // hitung yang hadir hari ini
  const { count: presentCount, error } = await supabase
    .from("attendance")
    .select("id, users!inner(supervisor_id)", { count: "exact", head: true })
    .eq("date", today)
    .eq("status", "hadir")
    .eq("users.supervisor_id", data.id);

  if (error) {
    console.error("Error fetching presentToday:", error);
  }

  presentToday = presentCount ?? 0;

  // hitung yang cuti/izin/sakit yang belum disetujui
  const { count: pendingCount, error: pendingError } = await supabase
    .from("attendance")
    .select("id, users!inner(supervisor_id)", { count: "exact", head: true })
    .eq("dispensation", "pending")
    .eq("users.supervisor_id", data.id);

  if (pendingError) {
    console.error("Error fetching pendingLeaves:", pendingError);
  }

  pendingLeaves = pendingCount ?? 0;

  // ambil semua kehadiran intern supervisor ini
const { data: attendanceData, error: attendanceError } = await supabase
  .from("attendance")
  .select("date, status, users!inner(supervisor_id)")
  .eq("users.supervisor_id", data.id);

if (attendanceError) {
  console.error("Error fetching attendance data:", attendanceError);
}

if (attendanceData && attendanceData.length > 0) {
  // buat object untuk menyimpan jumlah hadir per tanggal
  const attendancePerDay: Record<string, number> = {};

  attendanceData.forEach((att: any) => {
    if (att.status === "hadir") {
      if (!attendancePerDay[att.date]) {
        attendancePerDay[att.date] = 0;
      }
      attendancePerDay[att.date] += 1; // tambah jumlah hadir
    }
  });

  const totalDays = Object.keys(attendancePerDay).length;

  // total hadir seluruh hari
  const totalPresent = Object.values(attendancePerDay).reduce(
    (sum, val) => sum + val,
    0
  );

  // hitung avg attendance
  avgAttendance = totalDays > 0 && totalInterns > 0 
  ? (totalPresent / (totalDays * totalInterns)) * 100
  : 0;

  avgAttendance = parseFloat(avgAttendance.toFixed(2));
}

  // Ensure totalInterns is defined and in scope
  const stats = {
    totalInterns: totalInterns + " Anak",
    presentToday: presentToday + " Hadir",
    pendingLeaves: pendingLeaves + " Pending",
    avgAttendance: avgAttendance + "%",
  };

  const statCards = [
    {
      Icon: GoPeople,
      title: "Total Interns",
      value: stats.totalInterns,
      contentColor: "text-blue-600",
    },
    {
      Icon: GoClock,
      title: "Present Today",
      value: stats.presentToday,
      contentColor: "text-green-600",
    },
    {
      Icon: IoDocumentTextOutline,
      title: "Pending Leaves",
      value: stats.pendingLeaves,
      contentColor: "text-yellow-600",
    },
    {
      Icon: FiTrendingUp,
      title: "Avg Attendance",
      value: stats.avgAttendance,
      contentColor: "text-indigo-600",
    },
  ];

  return (
    <>
      <div className='relative bg-green-500 space-y-2 mb-7 h-48 p-8 rounded-lg overflow-hidden'>
        <Image
          src='/overlayBuilding.jpeg'
          alt='Overlay'
          fill
          priority
          className='absolute inset-0 object-cover opacity-25 z-0'
        />

        <div className='relative z-10'>
          <h1 className='title_header max-sm:text-3xl'>
            Selamat Datang, {user?.user_metadata.full_name}!
          </h1>
          <DashboardClock />
        </div>
      </div>

      <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-6 max-md:grid-cols-2 mb-5'>
        {statCards.map((card, i) => (
          <Card key={i}>
            <CardContent className='flex items-center p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1'>
              <StatCard
                Icon={card.Icon}
                title={card.title}
                value={card.value}
                contentColor={card.contentColor}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Intern Status */}
      {data.id && <DashboardTable supervisorId={data.id} />}
    </>
  );
}
