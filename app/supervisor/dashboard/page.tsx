import { GoClock, GoPeople } from "react-icons/go";
import { FiTrendingUp } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { auth } from '@/lib/server/auth'; 
import { supabase } from '@/lib/supabaseClient';
import '../../globals.css';
import Image from 'next/image';
import DashboardClock from "@/components/DashboardClock";
import { Card, CardContent } from "@/components/Card";
import StatCard from "@/components/StatCard";
import { DashboardTable } from "@/components/tabel-supervisor/AttendanceTable";

export default async function SupervisorDashboard() {
  const session = await auth();

  let totalInterns = 0;
  if (session?.id) {
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "intern")
      .eq("supervisor_id", session.id);

    totalInterns = count ?? 0;
  }

  const stats = {
    totalInterns,
    presentToday: 2,
    pendingLeaves: 50,
    avgAttendance: 2,
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
            Selamat Datang, Dika Arnanda Putra!
          </h1>
          <DashboardClock/>
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
      {session?.id && <DashboardTable supervisorId={session.id}/>}
    </>
  );
}
