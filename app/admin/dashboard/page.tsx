"use client";

// import { useRouter } from "next/navigation";
import Link from "next/link";

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import StatCard from "@/components/StatCard";

import { FaUsers, FaBuilding, FaRegCheckCircle } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import CardHeader from "@/components/CardHeader";
import CardTitle from "@/components/CardTitle";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  // const router = useRouter();

  // const handleNavigate = (page: string) => {
  //   router.push(`/admin/${page}`);
  // };

  // Mock data
  const user = {
    full_name: "Mia Melita",
  };

  const stats = {
    totalUsers: 45,
    activeInterns: 32,
    supervisors: 8,
    totalAttendance: 89,
    pendingRequests: 12,
    systemAlerts: 3,
  };

  const recentActivities = [
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
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <FaUsers className='h-4 w-4 text-blue-600' />;
      case "approval":
        return <FaRegCheckCircle className='h-4 w-4 text-green-600' />;
      case "attendance":
        return <AiFillFileText className='h-4 w-4 text-yellow-600' />;
      default:
        return <FiAlertTriangle className='h-4 w-4 text-gray-600' />;
    }
  };

  return (
    <LayoutWrapper>
      <div className=' space-y-2 mb-7 bg-[#9929EA] h-48 p-8 rounded-lg'>
        <h1 className='title_header'>Selamat Datang, Ibu {user.full_name}!</h1>
        <h2 className='text-white text-2xl'>Kamis, 14 Agustus 2025</h2>
        <p className='text-white text-lg'>13:18:15</p>
      </div>

      <div className='grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:grid-cols-2'>
        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              Icon={FaUsers}
              title='Total Users'
              value={stats.totalUsers}
              contentColor='text-blue-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              Icon={FaBuilding}
              title='Active Interns'
              value={stats.activeInterns}
              contentColor='text-green-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              Icon={AiFillFileText}
              title='Pending Requests'
              value={stats.pendingRequests}
              contentColor='text-yellow-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              Icon={FaUsers}
              title='Supervisors'
              value={stats.supervisors}
              contentColor='text-indigo-600'
            />
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-row mt-5 justify-center gap-6 items-center '>
        <Card className='w-1/2 max-h-[320px] h-[320px]'>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentActivities.map((activity) => (
                <li key={activity.id} className='flex items-start space-x-3'>
                  <div className='flex-shrink-0 mt-1'>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900'>
                      {activity.action}
                    </p>
                    <p className='text-sm text-gray-600'>
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='w-1/2 h-[320px] max-h-[320px]'>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-10'>
            <Button asChild variant='outline' className='p-10'>
              <Link href='/admin/user'>
                <FaUsers className='h-8 w-8 text-blue-600' />
                <span className='text-sm'>Add User</span>
              </Link>
            </Button>

            <Button asChild variant='outline' className='p-10'>
              <Link href='/admin/supervisor'>
                <AiFillFileText className='h-8 w-8 text-green-600' />
                <span className='text-sm'>Add Supervisor</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
