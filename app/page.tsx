import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import LogoESDM from "@/public/logo.png";

import { login } from "./action";

export default function LoginPage() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Card className='w-full max-w-md'>
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
        </CardHeader>

        <CardContent>
          <form className='space-y-4'>
            <div className='relative'>
              <FaRegUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                id='nomorInduk'
                name='nomorInduk'
                type='number'
                placeholder='Nomor Induk'
                className='pl-10 pr-10'
                required
                min={0}
              />
            </div>
            <div className='relative'>
              <CiLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                className='pl-10 pr-10'
                required
                minLength={6}
              />
            </div>

            <Button formAction={login} type='submit' className='w-full'>
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

// "use client";

// import { useRouter } from "next/navigation";
// import LoginForm from "@/components/LoginForm";

// type UserRole = "intern" | "supervisor" | "admin";

// export interface User {
//   role: UserRole;
// }

// export default function LoginPage() {
//   const router = useRouter();

//   const handleLogin = (user: User) => {
//     // Arahkan ke halaman dashboard sesuai role
//     switch (user.role) {
//       case "intern":
//         router.push("/intern/dashboard");
//         break;
//       case "supervisor":
//         router.push("/supervisor/dashboard");
//         break;
//       case "admin":
//         router.push("/admin/dashboard");
//         break;
//       default:
//         router.push("/intern/dashboard");
//     }
//   };
//   return (
//     <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
//       <LoginForm onLogin={handleLogin} />
//     </main>
//   );
// }
