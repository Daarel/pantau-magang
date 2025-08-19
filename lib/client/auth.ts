// 'use client'
import { supabase } from "../supabaseClient"
import bcrypt from 'bcryptjs';

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

  // const passwordMatch = await bcrypt.compare(password, user.password);
  // if (!passwordMatch) {
  //   console.error("DEBUG: Password salah");
  //   return { error: "Password salah" };
  // }

  // ✅ Simpan full user di localStorage (untuk client)
  const clientSafeUser = {
    id: user.id,
    nomor_induk: user.nomor_induk,
    name: user.name,
    role: user.role
  };
  localStorage.setItem("user", JSON.stringify(clientSafeUser));

  // ✅ Set cookie (supaya middleware bisa baca)
  const session = { id: user.id, role: user.role };
  const maxAge = 60 * 60 * 24 * 7; // 7 hari
  const sessionString = encodeURIComponent(JSON.stringify(session));
  
  const expires = new Date();
  expires.setTime(expires.getTime() + maxAge * 1000);
  
  // Format cookie dengan semua properti penting
  const cookieParts = [
    `session=${sessionString}`,
    `path=/`,
    `expires=${expires.toUTCString()}`,
    `max-age=${maxAge}`,
    `samesite=lax`,
    // Hanya set secure di production
    process.env.NODE_ENV === 'production' ? 'secure' : ''
  ].filter(Boolean).join('; ');
  
  document.cookie = cookieParts;

  console.log("DEBUG: User berhasil login, session tersimpan + cookie di-set");

  return { user };
}

export async function logoutUser() {
  // Hapus dari localStorage
  localStorage.removeItem("user");
  
  // Set cookie kedaluwarsa di masa lalu
  document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  
  console.log("DEBUG: User berhasil logout");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
