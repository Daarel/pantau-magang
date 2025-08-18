'use client'
import { useState, useEffect } from 'react'
import { getCurrentUser, logoutUser } from '@/lib/auth'

export default function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  return { user, logout: logoutUser }
}
