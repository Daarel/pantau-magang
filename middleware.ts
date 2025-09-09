import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const res = await updateSession(req);

  // ambil cookie session setelah updateSession jalan
  const sessionCookie = req.cookies.get("session")?.value;
  let session: { id?: string; role?: string } | null = null;

  if (sessionCookie) {
    try {
      session = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      session = null;
    }
  }

  const url = req.nextUrl.pathname;

  // role-based redirect
  if (url.startsWith("/intern") && session?.role !== "intern") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }
  if (url.startsWith("/supervisor") && session?.role !== "supervisor") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }
  if (url.startsWith("/admin") && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

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

//   if (url.startsWith("/intern") && session?.role !== "intern")
//     return NextResponse.redirect(new URL("/not-authorized", req.url));
//   if (url.startsWith("/supervisor") && session?.role !== "supervisor")
//     return NextResponse.redirect(new URL("/not-authorized", req.url));
//   if (url.startsWith("/admin") && session?.role !== "admin")
//     return NextResponse.redirect(new URL("/not-authorized", req.url));

//   return NextResponse.next();
// }
