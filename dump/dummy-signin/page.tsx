import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function DummySignUp() {
  async function signUp(formData: FormData) {
    "use server";

    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const full_name = formData.get("full_name") as string;
    const role = formData.get("role") as string;

    // signup + langsung simpan metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role,
        },
      },
    });

    if (error) {
      toast.error('Data tidak berhasil didapatkan.')
    }

    redirect("/");
  }

  return (
    <form action={signUp} className="max-w-sm mx-auto mt-10 space-y-3">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="full_name"
        placeholder="Display Name"
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Dummy Sign Up
      </button>
    </form>
  );
}
