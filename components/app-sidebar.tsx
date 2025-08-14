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
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: FiHome,
    path: '/dashboard'
  },
  {
    title: "Attendance",
    url: "#",
    icon: GoClock,
    path: '/attendance'
  },
  {
    title: "Schedule",
    url: "#",
    icon: FiCalendar,
    path: '/schedule'
  },
  {
    title: "Leave Requests",
    url: "#",
    icon: IoDocumentTextOutline,
    path: '/leave'
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="mt-12">
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a> */}
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