"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    nomorInduk: formData.get("nomorInduk") as string,
    password: formData.get("password") as string,
  };

  // Check if fields are empty
  if (!data.nomorInduk || !data.password) {
    throw new Error("Nomor Induk dan Password harus diisi");
  }

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("email, role")
    .eq("nomorInduk", data.nomorInduk)
    .single();

  if (usersError || !users) {
    throw new Error("Nomor Induk tidak ditemukan");
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: users.email,
    password: data.password,
  });

  if (error) {
    redirect("/error");
  }

  // Redirect based on role
  const redirectPath = users.role === 'intern'
    ? '/intern/dashboard'
    : users.role === 'supervisor'
    ? '/supervisor/dashboard'
    : '/admin/dashboard';

  revalidatePath(redirectPath, "layout");
  redirect(redirectPath);
}
