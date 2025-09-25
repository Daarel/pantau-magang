import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
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

  return NextResponse.json({ success: true });
}
