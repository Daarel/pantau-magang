'use client'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function LayoutWrapper({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
