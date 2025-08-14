// import { supabase } from "./supabaseClient";
// import bcrypt from "bcryptjs";

// export async function loginUser(nomorInduk: string, password: string) {
//   // Ambil user berdasarkan nomor_induk
//   const { data: user, error } = await supabase
//     .from("user")
//     .select("*")
//     .eq("nomor_induk", nomorInduk)
//     .single();

//   if (error || !user) {
//     return { error: "Nomor Induk tidak ditemukan" };
//   }

//   // Bandingkan password input dengan hash dari database
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return { error: "Password salah" };
//   }

//   // Kembalikan data user jika sukses
//   return { user };
// }

// import bcrypt from 'bcryptjs'
// import { supabase } from './supabaseClient'

// // Login manual
// export async function loginUser(nmr_induk, password) {
//   // Pastikan input adalah angka atau string yang bisa dicocokkan
//   const parsedNmrInduk = parseInt(nmr_induk, 10)

//   const { data: user, error } = await supabase
//     .from('users')
//     .select('*')
//     .eq('nmr_induk', nmr_induk)
//     .single()

//   if (error || !user) {
//     return { error: 'Nomor Induk tidak ditemukan' }
//   }

//   const isPasswordMatch = await bcrypt.compare(password, user.password)
//   if (!isPasswordMatch) {
//     return { error: 'Password salah' }
//   }

//   // Simpan session user ke localStorage
//   localStorage.setItem('user', JSON.stringify(user))

//   return { user }
// }

import bcrypt from 'bcryptjs'
import { supabase } from './supabaseClient'

export async function loginUser(nomorInduk: string, password: string) {
  console.log("DEBUG: Input nomor induk:", nomorInduk)
  console.log("DEBUG: Input password:", password)

  // Query ke Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('nmr_induk', nomorInduk) // Jangan parse jadi int untuk tes debug
    .single()

  console.log("DEBUG: Response Supabase data:", user)
  console.log("DEBUG: Response Supabase error:", error)

  if (error || !user) {
    console.error("DEBUG: Login gagal - Nomor induk tidak ditemukan")
    return { error: 'Nomor Induk tidak ditemukan' }
  }

  try {
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    console.log("DEBUG: Password cocok?", isPasswordMatch)

    if (!isPasswordMatch) {
      console.error("DEBUG: Password salah")
      return { error: 'Password salah' }
    }
  } catch (compareErr) {
    console.error("DEBUG: Error saat membandingkan password:", compareErr)
    return { error: 'Terjadi kesalahan pada validasi password' }
  }

  // Simpan session
  localStorage.setItem('user', JSON.stringify(user))
  console.log("DEBUG: User berhasil login, session tersimpan")

  return { user }
}

export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  return null
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}
