import { NextRequest, NextResponse } from "next/server";
import { getUserByNomorInduk } from "@/lib/helper/auth.helper";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { insertActivityLogs } from "@/lib/helper/insertActivityLogs.helper";

export async function POST(req: NextRequest) {
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

    await insertActivityLogs({
      action_type: "change_password",
      description: `Password akun ${userInfo.full_name} telah diubah`,
      target_name: userInfo.full_name,
    });

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userInfo.auth_id,
      {
        password: password,
      }
    );

    if (error || !data)
      return NextResponse.json(
        { success: false, message: "Terjadi kesalahan." },
        { status: 401 }
      );

    console.log(userInfo.role);
    
    if (userInfo.role === "admin") {
      return NextResponse.json({ success: false, redirect: "/" });
    }

    return NextResponse.json({
      success: true,
      message: "Password berhasil diubah",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
