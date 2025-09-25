import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function PUT(req: NextRequest) {
  const supabase = await createClient();
  try {
    const body = await req.json();
    // harus mengirim misalkan id atau auth_id sebagai nilai yang immutable
    const {
      id,
      nomor_induk,
      email,
      full_name,
      password,
      role,
      department,
      institution,
      nomor_induk_supervisor,
      intern_start_date,
      intern_end_date,
    } = body;

    let supervisorByNIM: { id: string; role: string } | null = null;

    if (role !== "supervisor") {
      const { data, error } = await supabase
        .from("users")
        .select("id, role")
        .eq("nomor_induk", nomor_induk_supervisor)
        .single();

      if (!data?.id || data.role !== "supervisor")
        return NextResponse.json({ error }, { status: 404 });

      if (error) return NextResponse.json({ error }, { status: 400 });

      supervisorByNIM = data;
    }

    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("auth_id")
      .eq("id", id)
      .single();

    if (fetchError || !userData) {
      return NextResponse.json(
        { error: "User tidak ditemukan." },
        { status: 404 }
      );
    }

    const { data: updatedAuthData, error: errorUpdateAuthData } =
      await supabaseAdmin.auth.admin.updateUserById(userData.auth_id, {
        email: email,
        password: password,
        user_metadata: { full_name: full_name, role: role },
      });

    if (errorUpdateAuthData)
      return NextResponse.json(
        { error: "Gagal update user." },
        { status: 500 }
      );

    const { error: updateError } = await supabase
      .from("users")
      .update({
        nomor_induk: Number(nomor_induk),
        email,
        full_name,
        role,
        department,
        institution,
        supervisor_id: supervisorByNIM?.id ?? null,
        intern_start_date,
        intern_end_date,
      })
      .eq("auth_id", userData.auth_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
