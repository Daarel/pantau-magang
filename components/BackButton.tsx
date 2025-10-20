import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IoArrowBackOutline } from "react-icons/io5";
import type { FC } from "react";

const BackButton: FC = () => {
  const router = useRouter();

  return (
    <Button
      size='icon'
      onClick={() => router.back()}
      className='absolute left-16 top-16 hover:bg-gray-200 rounded-full transition max-sm:left-5 max-sm:top-7'
      variant='ghost'
    >
      <IoArrowBackOutline
        size={100}
        className='text-gray-700 hover:text-gray-900'
      />
    </Button>
  );
};

export default BackButton;