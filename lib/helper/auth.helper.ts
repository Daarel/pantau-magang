import { createClient } from "@/lib/supabase/server";

export async function getUserByNomorInduk(nomorInduk: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("role, email, auth_id")
    .eq("nomor_induk", nomorInduk)
    .single();

  if (error) {
    console.error("Error:", error);
    return null;
  }

  return data;
}