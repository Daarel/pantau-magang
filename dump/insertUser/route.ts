import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

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
      supervisor_id: supervisorByNIM?.id ?? null,
      department,
      institution,
      email,
      auth_id: signUpData.user.id,
    },
  ]);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data });
}
