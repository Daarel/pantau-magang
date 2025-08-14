'use client'
import useAuth from '@/hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <span>Absensi Magang</span>
      {user && (
        <div>
          {user.full_name} | <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  )
}
