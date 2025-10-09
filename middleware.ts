import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

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

// import { NextResponse, NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const url = req.nextUrl.pathname;

//   const sessionCookie = req.cookies.get("session")?.value;
//   let session: { id?: string; role?: string } | null = null;

//   if (sessionCookie) {
//     try {
//       session = JSON.parse(decodeURIComponent(sessionCookie));
//     } catch {
//       session = null;
//     }
//   }

//   if (url.startsWith("/intern") && session?.role !== "intern") {
//     console.log("redirecting to not authorized");
//     return NextResponse.redirect(new URL("/not-authorized", req.url));
//   }
//   if (url.startsWith("/supervisor") && session?.role !== "supervisor") {
//     console.log("redirecting to not authorized");
//     return NextResponse.redirect(new URL("/not-authorized", req.url));
//   }
//   if (url.startsWith("/admin") && session?.role !== "admin") {
//     console.log("redirecting to not authorized");
//     return NextResponse.redirect(new URL("/not-authorized", req.url));
//   }

//   return NextResponse.next();
// }
