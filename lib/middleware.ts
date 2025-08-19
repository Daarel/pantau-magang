// import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareSupabaseClient({ req, res })

//   // refresh session
//   await supabase.auth.getSession()
//   return res
// }

// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;
  const protectedPaths = [
    '/admin',
    '/supervisor',
    '/intern',
    '/dashboard'
  ];

  // Cek jika path saat ini termasuk yang diproteksi
  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  // Jika tidak diproteksi, lanjutkan
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Jika tidak ada session cookie, redirect ke login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Validasi minimal: cek apakah session bisa di-parse
    const decoded = decodeURIComponent(sessionCookie);
    const session = JSON.parse(decoded);
    
    // Validasi struktur data session
    if (!session.id || !session.role) {
      throw new Error('Invalid session structure');
    }
  } catch (error) {
    // Jika parsing gagal, hapus cookie yang tidak valid dan redirect
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('session');
    return response;
  }

  return NextResponse.next();
}