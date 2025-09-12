"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function getEmailAndRoleByNomorInduk(nomorInduk: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      nomor_induk,
      role,
      auth_user:email_auth (
        email
      )
    `
    )
    .eq("nomor_induk", nomorInduk) // cari berdasarkan NIM
    .single();

  if (error) {
    console.error("❌ Query error:", error);
    return null;
  }

  return {
    email: data?.auth_user?.[0]?.email || null,
    role: data?.role || null,
  };
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const loginData = {
    nomorInduk: formData.get("nomorInduk") as string,
    password: formData.get("password") as string,
  };

  if (!loginData.nomorInduk || !loginData.password) {
    throw new Error("Nomor Induk dan Password harus diisi");
  }

  const { email, role } = (await getEmailAndRoleByNomorInduk(loginData.nomorInduk)) || {};

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: loginData.password,
  });

  if (error) {
    redirect("/error");
  }

  // Redirect based on role
  const redirectPath = role === 'intern'
    ? '/intern/dashboard'
    : role === 'supervisor'
    ? '/supervisor/dashboard'
    : '/admin/dashboard';

  revalidatePath(redirectPath, "layout");
  redirect(redirectPath);
}