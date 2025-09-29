import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  try {
    const body = await req.json();
    const { nomor_induk, email, full_name, auth_id, department } = body;
    console.log({ nomor_induk, email, full_name, auth_id, department });

    const { data: updatedAuthData, error: errorUpdateAuthData } =
      await supabaseAdmin.auth.admin.updateUserById(auth_id, {
        email: email,
        user_metadata: { full_name: full_name },
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
        email: email,
        full_name,
        department,
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
