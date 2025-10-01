"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface LoginButtonProps {
  buttonTitle: string;
  disabled: boolean;
}

const LoginButton: FC<LoginButtonProps> = ({ buttonTitle, disabled }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={disabled}
      className='w-full text-[#fcf400] bg-foreground mt-7 font-normal'
    >
      {pending ? "Tunggu..." : buttonTitle}
    </Button>
  );
};

export default LoginButton;
