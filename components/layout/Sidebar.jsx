'use client'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'

const menuByRole = {
  intern: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Leave', path: '/leave' }
  ],
  supervisor: [
    { label: 'Interns', path: '/interns' },
    { label: 'Reports', path: '/reports' }
  ],
  admin: [
    { label: 'Users', path: '/users' },
    { label: 'Reports', path: '/reports' },
    { label: 'Settings', path: '/settings' }
  ]
}

export default function Sidebar() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-4">{user.role.toUpperCase()}</h2>
      <ul>
        {menuByRole[user.role]?.map((item, idx) => (
          <li key={idx} className="mb-2">
            <Link href={`/${user.role}${item.path}`} className="hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
