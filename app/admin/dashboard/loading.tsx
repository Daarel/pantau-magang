import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col p-6 min-h-screen gap-5'>
      <Skeleton className='h-[200px] w-full' />
      <div className='flex flex-row justify-between items-center gap-4'>
        <Skeleton className='h-[100px] flex-1/4' />
        <Skeleton className='h-[100px] flex-1/4' />
        <Skeleton className='h-[100px] flex-1/4' />
        <Skeleton className='h-[100px] flex-1/4' />
      </div>
      <div className='flex flex-row justify-between items-center gap-4'>
        <Skeleton className='h-[500px] flex-1/2' />
        <Skeleton className='h-[500px] flex-1/2' />
      </div>
    </div>
  );
}
