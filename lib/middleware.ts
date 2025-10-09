import { type NextRequest } from 'next/server'
import { updateSession } from './supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({req, res})

//   const { data: { session }, } = await supabase.auth.getSession();

//   const pathname = req.nextUrl.pathname;

//   const roleBasedRoutes: Record<string, string[]> = {
//     admin: ["/admin", "/profile"],
//     supervisor: ["/supervisor", "/profile"],
//     intern: ["/intern", "/profile"],
//   }

//   if (!session?.user) {
//     const loginUrl = req.nextUrl.clone();
//     loginUrl.pathname = "/";
//     loginUrl.searchParams.set("redirectedFrom", pathname)
//     return NextResponse.redirect(loginUrl);
//   }

//   const userRole = session.user.app_metadata.role ?? null;
//   const allowedRoutes = roleBasedRoutes[userRole ?? []];


// }