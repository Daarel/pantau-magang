import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-3'>
      <Skeleton className='h-[40px] w-[400px]' />
      <Skeleton className='h-[20px] w-[400px]' />
      <Skeleton className='h-[400px] w-[400px]' />
    </div>
  );
}
