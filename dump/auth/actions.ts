// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/server";
// import { supabaseAdmin } from "../../lib/supabase/admin";

// export async function loginUser(formData: FormData): Promise<void> {
//   const supabase = await createClient();

//   const loginData = {
//     nomorInduk: formData.get("nomorInduk") as string,
//     password: formData.get("password") as string,
//   };

//   if (!loginData.nomorInduk)
//     return { success: false, message: "Nomor induk harus diisi" };

//   if (!loginData.password)
//     return { success: false, message: "Password harus diisi" };

//   const userInfo = await getUserByNomorInduk(loginData.nomorInduk);

//   if (!userInfo)
//     return { success: false, message: "Nomor induk tidak ditemukan" };

//   const { email, role } = userInfo;

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: email,
//     password: loginData.password,
//   });

//   if (error || !data)
//     return { success: false, message: "Nomor induk atau password salah" };

//   // Redirect based on role
//   const redirectPath =
//     role === "intern"
//       ? "/intern/dashboard"
//       : role === "supervisor"
//       ? "/supervisor/dashboard"
//       : "/admin/dashboard";

//   revalidatePath(redirectPath, "layout");
//   redirect(redirectPath);
// }

// export async function resetPassword(formData: FormData) {
//   const loginData = {
//     nomorInduk: formData.get("nomorInduk") as string,
//     password: formData.get("password") as string,
//   };

//   if (!loginData.nomorInduk)
//     return { success: false, message: "Nomor induk harus diisi" };

//   if (!loginData.password)
//     return { success: false, message: "Password harus diisi" };

//   const userInfo = await getUserByNomorInduk(loginData.nomorInduk);

//   if (!userInfo)
//     return { success: false, message: "Nomor induk tidak ditemukan" };

//   const { auth_id } = userInfo;

//   const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
//     auth_id,
//     {
//       password: loginData.password,
//     }
//   );

//   if (error || !data)
//     return { success: false, message: "Reset password salah" };

//   console.log("Password berhasil direset untuk user:", data);
// }
