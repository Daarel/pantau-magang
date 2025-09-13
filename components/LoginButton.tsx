"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const LoginButton: FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' className='w-full mt-5' disabled={pending}>
      {pending ? "Loading..." : "Log in"}
    </Button>
  );
};

export default LoginButton;
