import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface CheckInButton {
  text: string;
}

export const CheckInButton = ({ message } : { message: string }) => {
  const router = useRouter();
  return (
    <Button
      size='icon'
      className='w-full bg-green-200 hover:bg-green-300 border-green-700 active:bg-green-400 transition-colors duration-100 shadow'
      onClick={() => router.push("/intern/attendance")}
    >
      <h5 className='text-black/80 font-bold'>{message}</h5>
    </Button>
  );
};

interface DisabledButton {
  text: string;
}

export const DisabledButton = ({ message } : { message: string }) => {
  return (
    <Button 
      disabled
      size='icon' 
      className='w-full bg-gray-200 shadow'
    >
      <h5 className='text-black/90 font-bold'>{message}</h5>
    </Button>
  );
};
