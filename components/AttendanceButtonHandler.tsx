import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const CheckInButton = (text: string) => {
  const router = useRouter();
  return (
    <Button 
      size='icon' 
      className='w-full bg-green-200 hover:bg-green-300 border-green-700 active:bg-green-400 transition-colors duration-100 shadow'
      onClick={() => router.push('/intern/attendance')}
    >
      <h5 className='text-black/80 font-bold'>{text}</h5>
    </Button>
  )
}

export const DisabledButton = (text: string) => {
  return (
    <Button 
      disabled
      size='icon' 
      className='w-full bg-gray-200 shadow'
    >
      <h5 className='text-black/90 font-bold'>{text}</h5>
    </Button>
  )
}