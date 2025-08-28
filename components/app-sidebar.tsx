import { FaUser, FaUserTie } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

const menuByRole = {
  intern: [
    { title: "Dashboard", path: "/intern/dashboard", icon: BsHouse },
    {
      title: "Attendance",
      path: "/intern/attendance",
      icon: AiOutlineClockCircle,
    },
    { title: "History", path: "/intern/history", icon: FiCalendar },
    { title: "Record", path: "/intern/record", icon: IoDocumentTextOutline },
  ],
  supervisor: [
    { title: "Dashboard", path: "/supervisor/dashboard", icon: BsHouse },
    {
      title: "Attendance",
      path: "/supervisor/attendance",
      icon: AiOutlineClockCircle,
    },
    { title: "Reports", path: "/supervisor/reports", icon: FiCalendar },
  ],
  admin: [
    { title: "Dashboard", path: "/admin/dashboard", icon: BsHouse },
    { title: "User", path: "/admin/user", icon: FaUser },
    { title: "Supervisor", path: "/admin/supervisor", icon: FaUserTie },
  ],
};

export function AppSidebar() {
  const [role, setRole] = useState<keyof typeof menuByRole>("intern"); // default intern
  const pathname = usePathname();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.role && menuByRole[user.role as keyof typeof menuByRole]) {
          setRole(user.role);
        }
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
      }
    }
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        {/* <SidebarGroup className="mt-12"> */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {menuByRole[role].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.path}>
                      <item.icon className="h-9 w-9"/> 
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {menuByRole[role].map((item) => {
                const isActive = pathname.startsWith(item.path);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className='flex items-center gap-3 pl-5 py-2 rounded-md transition-colors'
                    >
                      <Link href={item.path}>
                        <item.icon className='h-9 w-9' />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
