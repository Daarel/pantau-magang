"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "../supabase/admin";

async function getUserByNomorInduk(nomorInduk: string) {
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

export async function loginUser(formData: FormData) {
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

  if (error || !data) {
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

export async function resetPassword(formData: FormData) {
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

  const { auth_id } = userInfo;

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    auth_id,
    {
      password: loginData.password,
    }
  );

  if (error) {
    console.error("Gagal reset password:", error);
    throw new Error("Reset password gagal");
  }

  console.log("Password berhasil direset untuk user:", data);
}
