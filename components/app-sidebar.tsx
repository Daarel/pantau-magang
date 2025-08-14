import { FiHome, FiCalendar, } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
// const items = [
//   {
//     title: "Dashboard",
//     url: "#",
//     icon: FiHome,
//     path: '/intern/dashboard'
//   },
//   {
//     title: "Attendance",
//     url: "#",
//     icon: GoClock,
//     path: '/attendance'
//   },
//   {
//     title: "Schedule",
//     url: "#",
//     icon: FiCalendar,
//     path: '/schedule'
//   },
//   {
//     title: "Leave Requests",
//     url: "#",
//     icon: IoDocumentTextOutline,
//     path: '/leave'
//   },
// ]

const menuByRole = {
  intern: [
    { title: 'Dashboard', path: '/dashboard', icon: FiHome, },
    { title: 'Attendance', path: '/attendance', icon: GoClock, },
    { title: 'Schedule', path: '/schedule', icon: FiCalendar, },
    { title: 'Leave', path: '/leave', icon: IoDocumentTextOutline, }
  ],
  supervisor: [
    { title: 'My Interns', path: '/interns', icon: FiHome, },
    { title: 'Reports', path: '/supervisor_reports', icon: GoClock, },
  ],
  admin: [
    { title: 'Users', path: '/users', icon: FiHome, },
    { title: 'Reports', path: '/reports', icon: GoClock, },
    { title: 'Settings', path: '/settings', icon: GoClock, },
  ],
}

export function AppSidebar() {
  const role = "intern" // dummy role
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="mt-12">
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.path}>
                      <item.icon />{item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {menuByRole[role].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.path}>
                      <item.icon />{item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}