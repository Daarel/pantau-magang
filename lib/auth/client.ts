import { createClient } from "../../lib/supabase/client";

export async function logoutUser() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    throw error;
  }

  console.log("✅ Logout berhasil");
}