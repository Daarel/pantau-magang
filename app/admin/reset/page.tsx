"use client";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
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
        setError(json.message || "Login gagal, coba lagi.");
      }

      if (json.success) {
        if (json.redirect) {
          router.push(json.redirect);
        } else {
          router.push("/login");
        }
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-10 mt-[-100px]'>
      <div className='text-4xl font-bold text-gray-800'>Ubah Password</div>
      <div className='w-[400px]'>
        {error && (
          <div className=' text-sm text-red-600 bg-red-100 p-2 rounded'>
            {error}
          </div>
        )}
        <form onSubmit={handleResetPassword} className='flex flex-col gap-6'>
          <div>
            <Label>
              <span className='w-4 h-4'>
                <FaRegUser className='w-4 h-4' />
              </span>
              Nomor Induk
            </Label>
            <Input
              id='nomorInduk'
              name='nomorInduk'
              placeholder='Masukkan nomor induk'
              className='mt-3'
              required
            />
          </div>

          <div>
            <Label>
              <span className='w-4 h-4'>
                <CiLock className='w-4 h-4' />
              </span>
              Password Baru
            </Label>
            <Input
              id='password'
              name='password'
              placeholder='Masukkan password baru'
              className='mt-3'
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
