import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(req: NextRequest) {
  try {
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

      if (!auth_id) {
        return NextResponse.json({ error: "auth_id wajib dikirim"}, { status: 400 })
      };
  }
}