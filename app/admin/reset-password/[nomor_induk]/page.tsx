"use client";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUser, FaLock } from "react-icons/fa";
import LoginButton from "@/components/LoginButton";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNomorInduk, setSelectedNomorInduk] = useState<string>("");
  const router = useRouter();
  const { nomor_induk } = useParams<{ nomor_induk: string }>();

  useEffect(() => {
    if (nomor_induk) {
      setSelectedNomorInduk(nomor_induk);
    }
  }, [nomor_induk]);

  async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          nomorInduk: selectedNomorInduk,
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
      <Button
        onClick={() => router.back()}
        className='absolute left-16 top-16 px-2 py-2 hover:bg-gray-200 rounded-full transition'
        variant="ghost"
      >
        <IoArrowBackOutline className='text-2xl text-gray-700 hover:text-gray-900' />
      </Button>

      <div className='text-4xl max-sm:text-2xl font-bold text-gray-800 text-center'>
        Ubah Password
      </div>

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
                <FaUser className='w-4 h-4 inline' />
              </span>
              Nomor Induk
            </Label>
            <Input
              id='nomor_induk'
              name='nomor_induk'
              value={selectedNomorInduk}
              onChange={(e) => setSelectedNomorInduk(e.target.value)}
              className='mt-3 w-full'
              disabled
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
            buttonTitle={isLoading ? "Loading..." : "Ubah"}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
