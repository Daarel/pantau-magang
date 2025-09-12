import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser } from "@/lib/auth/actions";

import LogoESDM from "@/public/logo.png";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { CiLock } from "react-icons/ci";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
      <Card className='w-[400px]'>
        <CardHeader className='text-center'>
          <div className='mx-auto p-3 w-fit mb-4'>
            <Image
              src={LogoESDM}
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
          <p className='text-gray-600'>Sign in to your account</p>
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
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                className='pl-10'
                required
              />
            </div>
            <Button formAction={loginUser} className='w-full mt-5'>Log in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
