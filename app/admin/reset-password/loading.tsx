import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-2 mt-16'>
      <Skeleton className='h-[40px] w-[260px]' />
      <Skeleton className='h-[16px] w-[400px]' />
      <Skeleton className='h-[36px] w-[400px]' />
      <Skeleton className='h-[16px] w-[400px]' />
      <Skeleton className='h-[36px] w-[400px]' />
      <Skeleton className='h-[36px] w-[400px] mt-10' />
    </div>
  );
}
