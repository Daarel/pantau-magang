import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import StatCard from "@/components/StatCard";

import { FaUsers, FaBuilding, FaRegCheckCircle } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import CardHeader from "@/components/CardHeader";
import CardTitle from "@/components/CardTitle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminAttendance() {
  // Mock data
  const user = {
    full_name: "Windah Barusadar",
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
      type: "approval",
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
      type: "user",
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
      <div className='space-y-6 mb-7'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
        <p className=' mt-1'>Welcome, {user?.full_name}</p>
        <p>Manage the entire internship attendance system</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              icon={<FaUsers className='h-6 w-6 text-blue-600' />}
              title='Total Users'
              value={stats.totalUsers}
              subtitle='+5 this week'
              subtitleColor='text-blue-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              icon={<FaBuilding className='h-6 w-6 text-green-600' />}
              title='Active Interns'
              value={stats.activeInterns}
              subtitle='Across all departments'
              subtitleColor='text-green-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              icon={<IoMdTrendingUp className='h-6 w-6 text-purple-600' />}
              title='Overall Attendance'
              value={`${stats.totalAttendance}%`}
              subtitle='This month'
              subtitleColor='text-purple-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              icon={<AiFillFileText className='h-6 w-6 text-yellow-600' />}
              title='Pending Requests'
              value={stats.pendingRequests}
              subtitle='Need approval'
              subtitleColor='text-yellow-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              icon={<FaUsers className='h-6 w-6 text-indigo-600' />}
              title='Supervisors'
              value={stats.supervisors}
              subtitle='Managing interns'
              subtitleColor='text-indigo-600'
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center p-6'>
            <StatCard
              icon={<FiAlertTriangle className='h-6 w-6 text-red-600' />}
              title='System Alerts'
              value={stats.systemAlerts}
              subtitle='Require attention'
              subtitleColor='text-red-600'
            />
          </CardContent>
        </Card>
      </div>

      <div className='grid gird-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
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

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-4'>
            <Button
              variant='outline'
              className='flex flex-col items-center py-6'
            >
              <FaUsers className='h-8 w-8 mb-2 text-blue-600' />
              <span className='text-sm'>Add User</span>
            </Button>
            <Button
              variant='outline'
              className='flex flex-col items-center py-6'
            >
              <AiFillFileText className='h-8 w-8 mb-2 text-green-600' />
              <span className='text-sm'>Generate Report</span>
            </Button>
            <Button
              variant='outline'
              className='flex flex-col items-center py-6'
            >
              <FaBuilding className='h-8 w-8 mb-2 text-purple-600' />
              <span className='text-sm'>System Settings</span>
            </Button>
            <Button
              variant='outline'
              className='flex flex-col items-center py-6'
            >
              <FiAlertTriangle className='h-8 w-8 mb-2 text-red-600' />
              <span className='text-sm'>View Alerts</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='flex items-center justify-between p-4 bg-green-50 rounded-lg'>
              <div className='flex items-center'>
                <FaRegCheckCircle className='h-5 w-5 text-green-600 mr-2' />
                <span className='text-sm font-medium'>Database</span>
              </div>
              <Badge variant='success'>Healthy</Badge>
            </div>

            <div className='flex items-center justify-between p-4 bg-green-50 rounded-lg'>
              <div className='flex items-center'>
                <FaRegCheckCircle className='h-5 w-5 text-green-600 mr-2' />
                <span className='text-sm font-medium'>API Status</span>
              </div>
              <Badge variant='success'>Online</Badge>
            </div>

            <div className='flex items-center justify-between p-4 bg-yellow-50 rounded-lg'>
              <div className='flex items-center'>
                <FiAlertTriangle className='h-5 w-5 text-yellow-600 mr-2' />
                <span className='text-sm font-medium'>Email Service</span>
              </div>
              <Badge variant='warning'>Limited</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </LayoutWrapper>
  );
}
