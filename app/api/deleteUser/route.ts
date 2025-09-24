import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const { nomor_induk } = await req.json();
  const supabase = await createClient();

  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("id, auth_id")
    .eq("nomor_induk", nomor_induk)
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
    .eq("nomor_induk", nomor_induk);

  if (tableError) {
    return NextResponse.json(
      {
        error: tableError.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true })
}
