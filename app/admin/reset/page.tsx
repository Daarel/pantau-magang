import LoginButton from "@/components/LoginButton";
import LoginInput from "@/components/LoginInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

import { resetPassword } from "@/lib/auth/actions";


export default function AdminReset() {
  return (
    <div className='flex justify-center min-h-screen'>
      <Card className='px-4 text-center h-4/5 w-1/3'>
        <CardHeader className='mb-2'>
          <CardTitle className='text-2xl font-bold text-gray-800'>
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={resetPassword} className="flex flex-col gap-4">
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
            <LoginButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
