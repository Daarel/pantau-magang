import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import StatCard from "@/components/StatCard";

import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { PiCertificate } from "react-icons/pi";
import {
  FaUser,
  FaBuilding,
  FaUserGraduate,
  FaUserTie,
  FaPen,
  FaLock,
} from "react-icons/fa";
import Image from "next/image";
import NavigationButton from "@/components/NavigationButton";
import DashboardClock from "@/components/DashboardClock";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { toast } from "sonner";

type ActivityType =
  | "insert_intern"
  | "insert_supervisor"
  | "delete_intern"
  | "delete_supervisor"
  | "update_intern"
  | "update_supervisor"
  | "change_password";

export const revalidate = 60

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/"); 
  }

  const { data: summary, error } = await supabase
    .from("users_summary")
    .select("*");

  if (error) {
    console.error("error get data");
    toast.error("Gagal mendapatkan data");
  }

  if (!summary || summary.length === 0) {
    console.error("error get summary data");
    toast.warning("Data tidak tersedia untuk saat ini")
  }

  const { data, error: errorGetData } = await supabase
    .from("activity_logs")
    .select("id, full_name, action_type, description, target_name, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (errorGetData) {
    console.error("Error fetching", errorGetData);
    toast.error("Gagal mendapatkan data")
  }

  const stats = {
    totalUsers: summary?.[0]?.total_users ?? 0,
    activeInterns: summary?.[0]?.total_intern ?? 0,
    supervisors: summary?.[0]?.total_supervisor ?? 0,
    departments: summary?.[0]?.total_departement ?? 0,
  };

  const statCards = [
    {
      Icon: FaUser,
      title: "Jumlah Pengguna",
      value: stats.totalUsers,
      contentColor: "text-blue-600",
    },
    {
      Icon: FaUserGraduate,
      title: "Anak Magang",
      value: stats.activeInterns,
      contentColor: "text-green-600",
    },
    {
      Icon: FaUserTie,
      title: "Supervisors",
      value: stats.supervisors,
      contentColor: "text-indigo-600",
    }, 
    {
      Icon: FaBuilding,
      title: "Gedung Terdaftar",
      value: stats.departments,
      contentColor: "text-yellow-600",
    },
  ];

  const navigationButtons = [
    {
      href: "/admin/intern?modalInsert=open",
      icon: <FaUser className='h-8 w-8 text-blue-600' />,
      label: "Tambah Anak Magang",
    },
    {
      href: "/admin/supervisor?modalInsert=open",
      icon: <FaUserTie className='h-8 w-8 text-indigo-600' />,
      label: "Tambah Supervisor",
    },
    {
      href: "/admin/reset-password",
      icon: <FaLock className='h-8 w-8 text-green-600' />,
      label: (
        <>
          Ubah Password
          <br />
          Pengguna
        </>
      ),
    },
    {
      href: "/admin/upload-certificate",
      icon: <PiCertificate className='h-8 w-8 text-red-600' />,
      label: (
        <>
          Unggah Template
          <br />
          Certificate
        </>
      ),
    },
  ];

  const getActivityIcon = (type: ActivityType) => {
    switch (true) {
      case type === "insert_intern" || type === "insert_supervisor":
        return <AiOutlineUserAdd className='h-6 w-6 text-blue-600' />;

      case type === "delete_intern" || type === "delete_supervisor":
        return <AiOutlineUserDelete className='h-6 w-6 text-red-600' />;

      case type === "update_intern" || type === "update_supervisor":
        return <FaPen className='h-4 w-4 mx-1 text-yellow-600' />;

      case type === "change_password":
        return <FaLock className='h-4 w-4 mx-1 text-green-600' />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className='relative space-y-2 mb-7 bg-purple-500 min-h-48 p-8 rounded-lg overflow-hidden'>
        <Image
          src='/overlayBuilding.webp'
          alt='Overlay'
          fill
          priority
          className='absolute inset-0 object-cover opacity-25 z-0'
        />

        <div className='relative z-10'>
          <h1 className='title_header max-sm:text-3xl capitalize'>
            Selamat Datang, {user?.user_metadata.full_name}!
          </h1>
          <DashboardClock />
        </div>
      </div>

      <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-5 max-md:grid-cols-2'>
        {statCards.map((card, i) => (
          <Card key={i}>
            <CardContent className='flex justify-center items-center gap-1 p-3 max-lg:p-0 max-lg:flex-col max-lg:gap-1'>
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

      <div className='flex flex-row mt-5 justify-center gap-6 items-center max-sm:flex-col'>
        <Card className='w-1/2 max-sm:w-full h-[350px] max-sm:h-auto'>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <ul className='flex flex-col gap-3 max-sm:gap-5'>
                {data && data.length > 0 ? (
                  data.map((activity) => (
                    <li
                      key={activity.id}
                      className='flex justify-start items-center gap-5'
                    >
                      <div>
                        {getActivityIcon(activity.action_type as ActivityType)}
                      </div>
                      <div>
                        <p className='text-sm max-sm:text-sm font-medium text-gray-900  max-w-[45ch]'>
                          {activity.description ?? activity.action_type}
                        </p>
                        <p className='text-sm max-sm:text-xs text-gray-600'>
                          {activity.full_name} •{" "}
                          {new Date(activity.created_at).toLocaleString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "short",
                            }
                          )}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className='text-gray-500 text-sm italic'>
                    Tidak ada aktivitas terbaru.
                  </p>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className='w-1/2 max-sm:w-full h-[350px] max-sm:h-auto'>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
            {navigationButtons.map(({ href, icon, label }, index) => (
              <NavigationButton
                key={index}
                variant='outline'
                className='card__navigation-button'
                href={href}
              >
                {icon}
                <span className='text-xs font-normal'>{label}</span>
              </NavigationButton>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
