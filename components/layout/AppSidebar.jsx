// 'use client'
// import Link from 'next/link'
// import useAuth from '@/hooks/useAuth'
// import {
//   Sidebar as ShadSidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuItem
// } from "@/components/ui/sidebar"

// const menuByRole = {
//   intern: [
//     { label: 'Dashboard', path: '/dashboard' },
//     { label: 'Attendance', path: '/attendance' },
//     { label: 'Schedule', path: '/schedule' },
//     { label: 'Leave', path: '/leave' }
//   ],
//   supervisor: [
//     { label: 'Interns', path: '/interns' },
//     { label: 'Reports', path: '/reports' }
//   ],
//   admin: [
//     { label: 'Users', path: '/users' },
//     { label: 'Reports', path: '/reports' },
//     { label: 'Settings', path: '/settings' }
//   ]
// }

// export default function AppSidebar() {
//   const { user } = useAuth()
//   if (!user) return null

//   const role = "intern" // dummy role

//   return (
//     <ShadSidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>{role.toUpperCase()}</SidebarGroupLabel>
//           <SidebarMenu>
//             {menuByRole[role].map((item, idx) => (
//               <SidebarMenuItem key={idx}>
//                 <SidebarMenuButton asChild>
//                   <Link href={item.path}>{item.label}</Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>
//     </ShadSidebar>
//   )
// }

import { Sidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  return <Sidebar />
}