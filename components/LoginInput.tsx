"use client";

import { useState, type FC, type InputHTMLAttributes } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
}

const LoginInput: FC<LoginInputProps> = ({ className, ...props }) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    if (!isDisabled) {
      setShowPassword((prev) => !prev);
    }
  };

  const isDisabled = pending || props.disabled;

  return (
    <>
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        disabled={isDisabled}
        className={className}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        disabled={isDisabled}
        className={clsx(
          "absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400",
          isDisabled ? "cursor-default" : "cursor-pointer hover:text-gray-600"
        )}
      >
        {showPassword ? (
          <AiOutlineEye className="h-5 w-5" />
        ) : (
          <AiOutlineEyeInvisible className="h-5 w-5 z-10" />
        )}
      </button>
    </>
  );
};

export default LoginInput;
