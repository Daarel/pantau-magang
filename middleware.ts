import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};


// import { NextResponse, type NextRequest } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next();

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SECRET_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll().map((c) => ({
//             name: c.name,
//             value: c.value,
//           }));
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             response.cookies.set(name, value, options);
//           });
//         },
//       },
//     }
//   );

//   const {
//     data: { session },
//     error,
//   } = await supabase.auth.getSession();

//   if (!session || error) {
//     const homeUrl = new URL("/", request.url);
//     return NextResponse.redirect(homeUrl);
//   }

//   const role = session.user.user_metadata?.role;
//   const pathname = request.nextUrl.pathname;

//   if (pathname.startsWith("/admin") && role !== "admin") {
//     return NextResponse.redirect(new URL("/not-authorized", request.url));
//   }

//   if (pathname.startsWith("/supervisor") && role !== "supervisor") {
//     return NextResponse.redirect(new URL("/not-authorized", request.url));
//   }

//   if (pathname.startsWith("/intern") && role !== "intern") {
//     return NextResponse.redirect(new URL("/not-authorized", request.url));
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|not-authorized|$).*)",
//   ],
// };
