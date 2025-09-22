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

  const { data: supervisorNomorInduk, error: errorSelectNomorInduk } =
    await supabase
      .from("users")
      .select("id")
      .eq("nomor_induk", nomor_induk_supervisor)
      .single();
    
    console.log(supervisorNomorInduk);

  if (errorSelectNomorInduk)
    return NextResponse.json({ error: errorSelectNomorInduk }, { status: 400 });

  const { data: signUpData, error: errorSignUp } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
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
      supervisor_id: supervisorNomorInduk.id,
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
