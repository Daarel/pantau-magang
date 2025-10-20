import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies
            .getAll()
            .map((c) => ({ name: c.name, value: c.value }));
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options as any);
          });
        },
      },
    }
  );

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (pathname.startsWith("/profile")) {
      if (!user) {
        return NextResponse.redirect(new URL("/not-authorized", request.url));
      }
    }

    const ROLES = ["admin", "supervisor", "intern"] as const;
    type Role = (typeof ROLES)[number];

    const roleMap = [
      { prefix: "/admin", role: "admin" },
      { prefix: "/supervisor", role: "supervisor" },
      { prefix: "/intern", role: "intern" },
    ] satisfies { prefix: string; role: Role }[];

    const matched = roleMap.find((r) => pathname.startsWith(r.prefix));
    if (matched) {
      if (!user) {
        return NextResponse.redirect(new URL("/not-authorized", request.url));
      }

      const role = user.user_metadata?.role;
      if (role !== matched.role) {
        return NextResponse.redirect(new URL("/not-authorized", request.url));
      }
    }

    return response;
  } catch (err) {
    console.error("Middleware supabase error:", err);
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/supervisor/:path*",
    "/intern/:path*",
    "/profile/:path*",
  ],
};
