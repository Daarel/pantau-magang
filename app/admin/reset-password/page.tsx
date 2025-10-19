"use client";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUser, FaLock } from "react-icons/fa";
import LoginButton from "@/components/LoginButton";
import { redirect, useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import Combobox from "@/components/ui/combobox";
import { getNomorIndukList } from "@/lib/helper/dataInsert.helper";
import { createClient } from "@/lib/supabase/client";

export default function AdminResetPassword() {
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNomorInduk, setSelectedNomorInduk] = useState<string>("");
  const [dataUserByNomorInduk, setDataUserByNomorInduk] = useState<
    { value: string; label: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const dataUserByNomorInduk = await getNomorIndukList();
      setDataUserByNomorInduk(dataUserByNomorInduk);
    }

    fetchData();
  }, []);

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
      <Link
        href='/admin/dashboard'
        className='absolute left-16 top-16 px-2 py-2 hover:bg-gray-200 rounded-full transition'
      >
        <IoArrowBackOutline className='text-2xl text-gray-700 hover:text-gray-900' />
      </Link>

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
            <Combobox
              fields={dataUserByNomorInduk}
              value={selectedNomorInduk}
              onChange={setSelectedNomorInduk}
              placeholder='Pilih nomor induk'
              emptyText='Nomor induk tidak ditemukan'
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
