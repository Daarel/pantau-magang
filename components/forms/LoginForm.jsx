'use client'
import { useState } from 'react'
import { loginUser } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [nmr_induk, setNmr_induk] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await loginUser(nmr_induk, password)
    if (res.error) setError(res.error)
    else {
      router.push(`/${res.user.role}/dashboard`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        // type="email"
        placeholder="Nomor Induk"
        value={nmr_induk}
        onChange={e => setNmr_induk(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Login
      </button>
    </form>
  )
}
