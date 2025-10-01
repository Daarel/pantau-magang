import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserByNomorInduk } from "@/lib/helper/auth.helper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nomorInduk, password } = body;

    const fieldErrors: Record<string, string> = {};
    if (!nomorInduk) fieldErrors.nomorInduk = "Nomor induk harus diisi";
    if (!password) fieldErrors.password = "Password harus diisi";
    if (Object.keys(fieldErrors).length)
      return NextResponse.json(
        { success: false, fieldErrors },
        { status: 400 }
      );

    const userInfo = await getUserByNomorInduk(nomorInduk);
    if (!userInfo)
      return NextResponse.json(
        { success: false, message: "Nomor induk tidak ditemukan" },
        { status: 404 }
      );

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userInfo.email,
      password,
    });

    if (error || !data)
      return NextResponse.json(
        { success: false, message: "Password salah" },
        { status: 401 }
      );

    const role = userInfo.role ?? "intern";
    const redirectPath =
      role === "intern"
        ? "/intern/dashboard"
        : role === "supervisor"
        ? "/supervisor/dashboard"
        : "/admin/dashboard";

    return NextResponse.json({ success: true, redirectPath });
  } catch (err) {
    console.error("login error", err);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
