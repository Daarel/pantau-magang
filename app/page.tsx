import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser } from "@/lib/auth/actions";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { CiLock } from "react-icons/ci";
import LoginButton from "@/components/LoginButton";
import LoginInput from "@/components/LoginInput";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <link rel='preload' as='image' href='/overlayBuilding.webp' />
      </Head>

      <div className="min-h-screen relative flex items-center justify-center bg-[url('/overlayBuilding.webp')] bg-cover bg-center">
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm z-0' />

        <Card className='w-[400px] max-sm:w-[300px] relative z-10'>
          <CardHeader className='text-center'>
            <div className='mx-auto p-3 w-fit mb-4'>
              <Image
                src='/logoESDM.png'
                alt='Logo Kementrian Energi dan Sumber Daya Mineral'
                width={150}
                height={150}
                priority
                className='h-auto w-auto'
              />
            </div>
            <CardTitle className='text-2xl text-gray-900'>
              PANTAU MAGANG
            </CardTitle>
            <p className='text-gray-600'>Masukkan akun Anda</p>
          </CardHeader>

          <CardContent>
            <form action={loginUser} className='space-y-4'>
              <div className='relative'>
                <FaRegUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
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
                <CiLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                <LoginInput
                  id='password'
                  name='password'
                  placeholder='Password'
                  className='pl-10'
                  required
                />
              </div>
              <LoginButton buttonTitle="Masuk" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
