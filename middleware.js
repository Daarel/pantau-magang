import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export function middleware(req) {
  const session = getCurrentUser()
  const url = req.nextUrl.pathname

  if (url.startsWith('/intern') && session?.role !== 'intern')
    return NextResponse.redirect(new URL('/not-authorized', req.url))
  if (url.startsWith('/supervisor') && session?.role !== 'supervisor')
    return NextResponse.redirect(new URL('/not-authorized', req.url))
  if (url.startsWith('/admin') && session?.role !== 'admin')
    return NextResponse.redirect(new URL('/not-authorized', req.url))

  return NextResponse.next()
}
