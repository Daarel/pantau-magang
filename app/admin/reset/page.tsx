import LoginButton from "@/components/LoginButton";
import LoginInput from "@/components/LoginInput";
import { Input } from "@/components/ui/input";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

import { resetPassword } from "@/lib/auth/actions";

export default function AdminReset() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-10 mt-[-100px]'>
      <div className='text-4xl font-bold text-gray-800'>Reset Password</div>
      <div className="w-[400px]">
        <form action={resetPassword} className='flex flex-col gap-6'>
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
              placeholder='New Password'
              className='pl-10'
              required
            />
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
}
