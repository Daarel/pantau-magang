import type { FC } from "react";
import { Skeleton } from "./ui/skeleton";


const LoadingLayout: FC = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Skeleton className='h-[80px] w-screen rounded-none' />
      <Skeleton className='w-[225px] flex-1 rounded-none' />
    </div>
  );
};

export default LoadingLayout;
