import { supabase } from "./supabaseClient";

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

  localStorage.setItem("user", JSON.stringify(user));
  console.log("DEBUG: User berhasil login, session tersimpan");

  return { user };
}

export function getCurrentUser() {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
