"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function getUserByNomorInduk(nomorInduk: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users_with_email")
    .select("role, email")
    .eq("nomor_induk", nomorInduk) // filter sesuai nomor_induk
    .single(); // karena 1 orang 1 nomor_induk

  if (error) {
    console.error("Error:", error);
    return null;
  }

  return data;
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

  const userInfo = await getUserByNomorInduk(loginData.nomorInduk);

  if (!userInfo) {
    throw new Error("Nomor Induk tidak ditemukan");
  }

  const { email, role } = userInfo;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: loginData.password,
  });

  if (error) {
    console.error("Login error:", error);
    redirect("/error");
  }

  // Redirect based on role
  const redirectPath =
    role === "intern"
      ? "/intern/dashboard"
      : role === "supervisor"
      ? "/supervisor/dashboard"
      : "/admin/dashboard";

  revalidatePath(redirectPath, "layout");
  redirect(redirectPath);
}
