import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import StatCard from "@/components/StatCard";

import {
  FaUsers,
  FaBuilding,
  FaRegCheckCircle,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import Image from "next/image";
import NavigationButton from "../../../components/NavigationButton";
import DashboardClock from "@/components/DashboardClock";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ActivityType = "user" | "approval" | "attendance" | "alert";

type recentActivities = {
  id: number;
  user: string;
  action: string;
  time: string;
  type: ActivityType;
};

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

  if (!summary || error) {
    throw new Error("cannot get data from view");
  }

  // Mock data
  const stats = {
    totalUsers: summary[0]?.total_users ?? 0,
    activeInterns: summary[0]?.total_intern ?? 0,
    supervisors: summary[0]?.total_supervisor ?? 0,
    departments: summary[0]?.total_departement ?? 0,
  };

  const statCards = [
    {
      Icon: FaUsers,
      title: "Total Users",
      value: stats.totalUsers,
      contentColor: "text-blue-600",
    },
    {
      Icon: FaUserGraduate,
      title: "Interns",
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
      title: "Departments",
      value: stats.departments,
      contentColor: "text-yellow-600",
    },
  ];

  const recentActivities: recentActivities[] = [
    {
      id: 1,
      action: "New intern registered",
      user: "John Doe",
      time: "2 minutes ago",
      type: "user",
    },
    {
      id: 2,
      action: "Leave request approved",
      user: "Jane Smith",
      time: "5 minutes ago",
      type: "attendance",
    },
    {
      id: 3,
      action: "Attendance record updated",
      user: "Mike Johnson",
      time: "10 minutes ago",
      type: "attendance",
    },
    {
      id: 4,
      action: "New supervisor assigned",
      user: "Dr. Sarah Wilson",
      time: "1 hour ago",
      type: "attendance",
    },
    {
      id: 5,
      action: "New supervisor assigned",
      user: "Dr. Sarah Wil",
      time: "1 hour ago",
      type: "attendance",
    },
  ];

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "user":
        return <FaUsers className='h-6 w-6 text-blue-600' />;
      case "approval":
        return <FaRegCheckCircle className='h-6 w-6 text-green-600' />;
      case "attendance":
        return <AiFillFileText className='h-6 w-6 text-yellow-600' />;
      default:
        return <FiAlertTriangle className='h-6 w-6 text-gray-600' />;
    }
  };

  return (
    <>
      <div className='relative space-y-2 mb-7 bg-purple-500 min-h-48 p-8 rounded-lg overflow-hidden'>
        <Image
          src='/overlayBuilding.jpeg'
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
        <Card className='w-1/2 max-sm:w-full h-[350px]'>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <ul className='flex flex-col gap-3 max-sm:gap-5'>
                {recentActivities.map((activity) => (
                  <li
                    key={activity.id}
                    className='flex justify-start items-center gap-5'
                  >
                    <div>{getActivityIcon(activity.type)}</div>
                    <div>
                      <p className='text-md max-sm:text-sm font-medium text-gray-900'>
                        {activity.action}
                      </p>
                      <p className='text-sm max-sm:text-xs text-gray-600'>
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className='w-1/2 max-sm:w-full h-[350px]'>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <NavigationButton
              variant='outline'
              className='p-10'
              href='/admin/user?modal=open'
            >
              <FaUsers className='h-8 w-8 text-blue-600' />
              <span className='text-sm'>Add User</span>
            </NavigationButton>
            <NavigationButton
              variant='outline'
              className='p-10'
              href='/admin/supervisor?modal=open'
            >
              <AiFillFileText className='h-8 w-8 text-green-600' />
              <span className='text-sm'>Add Supervisor</span>
            </NavigationButton>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
