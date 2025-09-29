"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const LoginButton: FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' className='w-full text-[#fcf400] bg-foreground mt-7 font-normal' disabled={pending}>
      {pending ? "Tunggu..." : "Masuk"}
    </Button>
  );
};

export default LoginButton;
