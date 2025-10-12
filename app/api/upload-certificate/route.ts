import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Tentukan nama file unik berdasarkan waktu upload
    const filename = `template-${Date.now()}.png`;

    const { data, error } = await supabaseAdmin.storage
      .from("certificate-template")
      .upload(filename, file, { upsert: true });

    if (error) throw error;

    const { data: publicData } = supabaseAdmin.storage
      .from("certificate-template")
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicData.publicUrl }, { status: 200 });
  } catch (err: any) {
    console.error("Upload error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
