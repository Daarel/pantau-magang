import LoginButton from "@/components/LoginButton";
import { Input } from "@/components/ui/input";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

import { resetPassword } from "@/lib/auth/actions";
import { Label } from "@/components/ui/label";

export default function AdminReset() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-10 mt-[-100px]'>
      <div className='text-4xl font-bold text-gray-800'>Ubah Password</div>
      <div className='w-[400px]'>
        <form action={resetPassword} className='flex flex-col gap-6'>
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
          <LoginButton buttonTitle='Ubah' />
        </form>
      </div>
    </div>
  );
}
