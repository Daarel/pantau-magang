import { supabase } from "./supabaseClient"

export async function loginUser(nomorInduk: number, password: string) {
  console.log("DEBUG: Input nomor induk:", nomorInduk);
  console.log("DEBUG: Input password:", password);

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("nomor_induk", nomorInduk)
    .single();

  console.log("DEBUG: Response Supabase data:", user);
  console.log("DEBUG: Response Supabase error:", error);

  if (error || !user) {
    console.error("DEBUG: Login gagal - Nomor induk tidak ditemukan");
    return { error: "Nomor Induk tidak ditemukan" };
  }

  if (password !== user.password) {
    console.error("DEBUG: Password salah");
    return { error: "Password salah" };
  }

  // ✅ Simpan full user di localStorage (untuk client)
  localStorage.setItem("user", JSON.stringify(user));

  // ✅ Set cookie (supaya middleware bisa baca)
  const session = { id: user.id, role: user.role };
  const maxAge = 60 * 60 * 24 * 7; // 7 hari
  document.cookie = `session=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=${maxAge}; samesite=lax`;

  console.log("DEBUG: User berhasil login, session tersimpan + cookie di-set");

  return { user };
}
