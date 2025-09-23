"use client";

import { useState, type FC, type InputHTMLAttributes } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";


interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className: string;
}

const LoginInput: FC<LoginInputProps> = (props) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Input type={showPassword ? "text" : "password"} {...props} />
      <button
        type='button'
        onClick={togglePasswordVisibility}
        disabled={pending}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'
      >
        {showPassword ? (
          <AiOutlineEye className='h-5 w-5' />
        ) : (
          <AiOutlineEyeInvisible className='h-5 w-5 z-10' />
        )}
      </button>
    </>
  );
};

export default LoginInput;
