import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { insertActivityLogs } from "@/lib/helper/insertActivityLogs.helper";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const body = await req.json();
  const {
    nomor_induk,
    email,
    full_name,
    password,
    role,
    department,
    institution,
    supervisor_id,
    intern_start_date,
    intern_end_date,
    status,
  } = body;

  const { data: dataUser, error: errorDataUser } = await supabase
    .from("users")
    .select("id, role")
    .eq("id", supervisor_id)
    .single();

  if (!dataUser?.id)
    return NextResponse.json(
      { error: "Supervisor tidak ditemukan" },
      { status: 404 }
    );

  if (errorDataUser)
    return NextResponse.json({ errorDataUser }, { status: 400 });

  const { data: signUpData, error: errorSignUp } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role },
    });

  if (errorSignUp)
    return NextResponse.json({ error: errorSignUp.message }, { status: 400 });

  const { data, error } = await supabase.from("users").insert([
    {
      nomor_induk: Number(nomor_induk),
      full_name,
      role,
      intern_start_date,
      intern_end_date,
      supervisor_id: dataUser?.id,
      department,
      institution,
      email,
      auth_id: signUpData.user.id,
      status,
    },
  ]);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  try {
    const body = await req.json();
    const {
      nomor_induk,
      email,
      full_name,
      department,
      institution,
      supervisor_id,
      intern_start_date,
      intern_end_date,
      auth_id,
      status,
    } = body;

    console.log("📥 Body dari request:", body);
    console.log("🔎 supervisor_id diterima:", supervisor_id);

    const { data: dataUser, error: errorDataUser } = await supabase
      .from("users")
      .select("id")
      .eq("id", supervisor_id)
      .single();

    if (!dataUser?.id)
      return NextResponse.json(
        { error: "Supervisor tidak ditemukan" },
        { status: 404 }
      );

    if (errorDataUser)
      return NextResponse.json({ errorDataUser }, { status: 400 });

    const { data: updatedAuthData, error: errorUpdateAuthData } =
      await supabaseAdmin.auth.admin.updateUserById(auth_id, {
        email: email,
        user_metadata: { full_name: full_name },
      });

    if (errorUpdateAuthData)
      return NextResponse.json(
        { error: "Gagal update intern" },
        { status: 500 }
      );

    const { error: updateError } = await supabase
      .from("users")
      .update({
        nomor_induk: Number(nomor_induk),
        email,
        full_name,
        department,
        institution,
        supervisor_id: String(dataUser?.id),
        intern_start_date,
        intern_end_date,
        status,
      })
      .eq("auth_id", auth_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const supabase = await createClient();

  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("auth_id")
    .eq("id", id)
    .single();

  if (fetchError || !userData) {
    return NextResponse.json(
      { error: "User tidak ditemukan" },
      { status: 400 }
    );
  }

  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
    userData.auth_id
  );

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const { error: tableError } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (tableError) {
    return NextResponse.json(
      {
        error: tableError.message,
      },
      { status: 500 }
    );
  }

  insertActivityLogs();

  return NextResponse.json({ success: true });
}
