import { GoClock, GoPeople } from "react-icons/go";
import { FiTrendingUp } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../../globals.css";
import Image from "next/image";
import DashboardClock from "@/components/DashboardClock";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { DashboardTable } from "@/components/tabel-supervisor/AttendanceTable";
import { MdNavigateNext, MdOutlineSick } from "react-icons/md";
import { FaRegCalendarCheck, FaUserTimes } from "react-icons/fa";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RealtimeDashboardRefresher from "@/components/RealtimeDashboardRefresher";

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
  let weeklyAttendance = 0;
  let izinCount = 0;
  let sakitCount = 0;
  let alfaCount = 0;

  const { data, error: errorGetUser } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
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
    .eq("supervisor_id", data.id)
    .eq("status", "aktif");

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

  if (error) console.error("Error fetching presentToday:", error);
  presentToday = presentCount ?? 0;

  // hitung yang cuti/izin/sakit yang belum disetujui
  const { count: pendingCount, error: pendingError } = await supabase
    .from("attendance")
    .select("id, users!inner(supervisor_id)", { count: "exact", head: true })
    .eq("dispensation", "pending")
    .eq("users.supervisor_id", data.id);

  if (pendingError)
    console.error("Error fetching pendingLeaves:", pendingError);
  pendingLeaves = pendingCount ?? 0;

  // ambil semua kehadiran intern supervisor ini
  const { data: attendanceData, error: attendanceError } = await supabase
    .from("attendance")
    .select("user_id, date, status, users!inner(supervisor_id)")
    .eq("users.supervisor_id", data.id);

  if (attendanceError) {
    console.error("Error fetching attendance data:", attendanceError);
  }

  if (attendanceData && attendanceData.length > 0) {
    // === Perhitungan akurat per intern ===
    const { data: internsData, error: internsError } = await supabase
      .from("users")
      .select("id")
      .eq("role", "intern")
      .eq("supervisor_id", data.id)
      .eq("status", "aktif");

    if (internsError)
      console.error("Error fetching interns data:", internsError);

    let totalRate = 0;

    if (internsData && internsData.length > 0) {
      for (const intern of internsData) {
        const internAttendance = attendanceData.filter(
          (att: any) => att.user_id === intern.id
        );

        const totalDays = internAttendance.length;
        const presentDays = internAttendance.filter(
          (att: any) => att.status === "hadir"
        ).length;

        if (totalDays > 0) {
          totalRate += presentDays / totalDays;
        }
      }

      avgAttendance =
        internsData.length > 0 ? (totalRate / internsData.length) * 100 : 0;

      avgAttendance = parseFloat(avgAttendance.toFixed(2));
    } else {
      avgAttendance = 0;
    }

    // === Weekly Attendance (Mon-Fri only) ===
    function countWorkdays(start: Date, end: Date) {
      let count = 0;
      const date = new Date(start);
      while (date <= end) {
        const day = date.getDay();
        if (day !== 0 && day !== 6) count++;
        date.setDate(date.getDate() + 1);
      }
      return count;
    }

    const todayDate = new Date(today);
    const mondayDate = new Date(todayDate);
    mondayDate.setDate(todayDate.getDate() - todayDate.getDay() + 1); // Senin minggu ini

    const workdaysCount = countWorkdays(mondayDate, todayDate);

    const weeklyPresent = attendanceData.filter((att: any) => {
      const d = new Date(att.date);
      return (
        att.status === "hadir" &&
        d >= mondayDate &&
        d <= todayDate &&
        d.getDay() !== 0 &&
        d.getDay() !== 6
      );
    }).length;

    const totalOpportunity = totalInterns * workdaysCount;

    weeklyAttendance =
      totalOpportunity > 0 ? (weeklyPresent / totalOpportunity) * 100 : 0;

    weeklyAttendance = parseFloat(weeklyAttendance.toFixed(2));
  }

  // hitung izin hari ini
  const { count: izinTodayCount, error: izinError } = await supabase
    .from("attendance")
    .select("id, users!inner(supervisor_id)", { count: "exact", head: true })
    .eq("date", today)
    .eq("status", "izin")
    .eq("dispensation", "approved")
    .eq("users.supervisor_id", data.id);

  if (izinError) console.error("Error fetching izinToday:", izinError);
  izinCount = izinTodayCount ?? 0;

  // hitung sakit hari ini
  const { count: sakitTodayCount, error: sakitError } = await supabase
    .from("attendance")
    .select("id, users!inner(supervisor_id)", { count: "exact", head: true })
    .eq("date", today)
    .eq("status", "sakit")
    .eq("dispensation", "approved")
    .eq("users.supervisor_id", data.id);

  if (sakitError) console.error("Error fetching sakitToday:", sakitError);
  sakitCount = sakitTodayCount ?? 0;

  // hitung alfa hari ini
  const { data: alfaData, error: alfaError } = await supabase
    .from("attendance")
    .select("id, users!inner(supervisor_id, status, intern_end_date)")
    .eq("date", today)
    .eq("status", "alfa")
    .eq("users.supervisor_id", data.id);

  if (alfaError) {
    console.error("Error fetching alfaToday:", alfaError);
  } else {
    // filter intern yang masih aktif atau belum melewati tanggal magang
    const activeAlfa = alfaData?.filter((att: any) => {
      const u = att.users;
      if (!u) return false;
      const endDate = u.intern_end_date ? new Date(u.intern_end_date) : null;
      const todayDate = new Date(today);
      return u.status === "aktif" && (!endDate || todayDate <= endDate);
    });

    alfaCount = activeAlfa?.length ?? 0;
  }

  const stats = {
    totalInterns: totalInterns + " Anak",
    presentToday: presentToday + " Hadir",
    izinToday: izinCount + " Izin",
    sakitToday: sakitCount + " Sakit",
    alfaToday: alfaCount + " Alfa",
    pendingLeaves: pendingLeaves + " Pesan",
    avgAttendance: avgAttendance + "%",
    weeklyAttendance: weeklyAttendance + "%",
  };

  const statCards = [
    {
      Icon: GoPeople,
      title: "Total Peserta",
      value: stats.totalInterns,
      contentColor: "text-blue-600",
    },
    {
      Icon: GoClock,
      title: "Kehadiran Hari Ini",
      value: stats.presentToday,
      contentColor: "text-green-600",
    },
    {
      Icon: IoDocumentTextOutline,
      title: "Pesan Menunggu",
      value: stats.pendingLeaves,
      contentColor: "text-yellow-600",
    },
    {
      Icon: FiTrendingUp,
      title: "Rata-Rata Kehadiran",
      value: stats.avgAttendance,
      contentColor: "text-indigo-600",
    },
    {
      Icon: FaRegCalendarCheck,
      title: "Izin Hari Ini",
      value: stats.izinToday,
      contentColor: "text-orange-600",
    },
    {
      Icon: MdOutlineSick,
      title: "Sakit Hari Ini",
      value: stats.sakitToday,
      contentColor: "text-red-600",
    },
    {
      Icon: FaUserTimes,
      title: "Alfa Hari Ini",
      value: stats.alfaToday,
      contentColor: "text-gray-700",
    },
    {
      Icon: FiTrendingUp,
      title: "Kehadiran Minggu Ini",
      value: stats.weeklyAttendance,
      contentColor: "text-purple-600",
    },
  ];

  return (
    <>
      <div className="relative bg-green-500 space-y-2 mb-7 min-h-48 p-8 rounded-lg overflow-hidden">
        <Image
          src="/overlayBuilding.webp"
          alt="Overlay"
          fill
          priority
          className="absolute inset-0 object-cover opacity-25 z-0"
        />
        <div className="relative z-10">
          <h1 className="title_header max-sm:text-3xl capitalize">
            Selamat Datang, {user?.user_metadata.full_name}!
          </h1>
          <DashboardClock />
        </div>
      </div>

      <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-6 max-md:grid-cols-2 mb-5">
        {statCards.map((card, i) => (
          <Card key={i}>
            {card.Icon === GoPeople ? (
              <Link href="/supervisor/internprofile" prefetch={false}>
                <CardContent
                  className={`flex justify-center items-center gap-0 p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1 pr-8 cursor-pointer 
                hover:scale-[1.02] 
                transition-all duration-200 rounded-xl`}
                >
                  <StatCard
                    Icon={card.Icon}
                    title={card.title}
                    value={card.value}
                    contentColor={card.contentColor}
                  />
                  <span className="ml-2 text-blue-600 font-extrabold text-2xl">
                    <MdNavigateNext className="w-6 h-6 font-extrabold drop-shadow-sm" />
                  </span>
                </CardContent>
              </Link>
            ) : (
              <CardContent className="flex justify-center items-center gap-0 p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1 pr-8">
                <StatCard
                  Icon={card.Icon}
                  title={card.title}
                  value={card.value}
                  contentColor={card.contentColor}
                />
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {data.id && <DashboardTable supervisorId={data.id} />}
      <RealtimeDashboardRefresher />
    </>
  );
}
