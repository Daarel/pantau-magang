"use client";
import { FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoginButton from "@/components/LoginButton";
import LoginInput from "@/components/LoginInput";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/login", {
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
      } else {
        router.push(json.redirectPath);
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <link rel='preload' as='image' href='/logoESDM.png' />
        <link rel='preload' as='image' href='/overlaybuilding.webp' />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[url('/overlayBuilding.webp')] bg-cover bg-center relative">
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
        <Card className='w-[400px] max-sm:w-[300px] relative z-10'>
          <CardHeader className='text-center'>
            <div className='mx-auto p-3 w-fit mb-4'>
              <Image
                src='/logoESDM.png'
                alt='Logo'
                width={200}
                height={200}
                priority
              />
            </div>
            <CardTitle className='text-2xl text-gray-900'>
              PANTAU MAGANG
            </CardTitle>
            <p className='text-gray-600'>Masukkan akun Anda</p>
          </CardHeader>

          <CardContent>
            {error && (
              <div className=' text-sm text-red-600 bg-red-100 p-2 rounded'>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
              <div className='relative'>
                <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <Input
                  id='nomorInduk'
                  name='nomorInduk'
                  type='number'
                  placeholder='Nomor Induk'
                  className='pl-10'
                  required
                />
              </div>

              <div className='relative'>
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <LoginInput
                  id='password'
                  name='password'
                  placeholder='Password'
                  className='pl-10'
                  disabled={isLoading}
                  required
                />
              </div>

              <LoginButton
                buttonTitle={isLoading ? "Loading..." : "Masuk"}
                disabled={isLoading}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
