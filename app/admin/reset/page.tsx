"use client";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegUser, FaLock } from "react-icons/fa";
import LoginButton from "@/components/LoginButton";
import { useRouter } from "next/navigation";

export default function AdminReset() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          nomorInduk: formData.get("nomorInduk"),
          password: formData.get("password"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "Reset password gagal, coba lagi.");
      }

      if (json.success) {
        if (json.redirect) {
          router.push(json.redirect);
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-10 mt-[-100px] px-4'>
      {/* Title */}
      <div className='text-4xl max-sm:text-2xl font-bold text-gray-800 text-center'>
        Ubah Password
      </div>

      {/* Card/Form Wrapper */}
      <div className='w-[400px] max-sm:w-full max-sm:max-w-sm'>
        {error && (
          <div className='text-sm text-red-600 bg-red-100 p-2 rounded mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleResetPassword} className='flex flex-col gap-6'>
          <div>
            <Label>
              <span className='w-4 h-4 inline-block mr-1'>
                <FaRegUser className='w-4 h-4 inline' />
              </span>
              Nomor Induk
            </Label>
            <Input
              id='nomorInduk'
              name='nomorInduk'
              placeholder='Masukkan nomor induk'
              className='mt-3 w-full'
              required
            />
          </div>

          <div>
            <Label>
              <span className='w-4 h-4 inline-block mr-1'>
                <FaLock className='h-4 w-4 inline' />
              </span>
              Password Baru
            </Label>
            <Input
              id='password'
              name='password'
              placeholder='Masukkan password baru'
              className='mt-3 w-full'
              required
            />
          </div>

          <LoginButton
            buttonTitle={isLoading ? "Loading..." : "Masuk"}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
