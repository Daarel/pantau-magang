import { FiHome, FiCalendar, } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { auth } from "@/lib/server/auth"

const menuByRole = {
  intern: [
    { title: "Dashboard", path: "/intern/dashboard", icon: FiHome },
    { title: "Attendance", path: "/intern/attendance", icon: GoClock },
    { title: "Schedule", path: "/intern/schedule", icon: FiCalendar },
    { title: "Leave", path: "/intern/leave", icon: IoDocumentTextOutline },
  ],
  supervisor: [
    { title: "Dashboard", path: "/supervisor/dashboard", icon: FiHome },
    { title: "Attendance", path: "/supervisor/attendance", icon: GoClock },
    { title: "Schedule", path: "/supervisor/schedule", icon: FiCalendar },
    { title: "Leave Requests", path: "/supervisor/leave-request", icon: IoDocumentTextOutline },
    { title: "My Interns", path: "/supervisor/my-interns", icon: FiHome },
    { title: "Reports", path: "/supervisor/reports", icon: GoClock },
  ],
  admin: [
    { title: "Dashboard", path: "/admin/dashboard", icon: FiHome },
    { title: "Attendance", path: "/admin/attendance", icon: GoClock },
    { title: "Schedule", path: "/admin/schedule", icon: FiCalendar },
    { title: "Leave Requests", path: "/admin/leave-request", icon: IoDocumentTextOutline },
    { title: "Users", path: "/admin/users", icon: FiHome },
    { title: "Reports", path: "/admin/reports", icon: GoClock },
    { title: "Settings", path: "/admin/settings", icon: GoClock },
  ],
};

export function AppSidebar() {
  const [role, setRole] = useState<keyof typeof menuByRole>("intern"); // default intern

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
        <SidebarGroup className="mt-12">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuByRole[role].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.path}>
                      <item.icon /> {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
