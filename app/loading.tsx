import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col p-6 min-h-screen gap-5'>
      <div className='flex flex-row justify-between items-center'>
        <Skeleton className='h-[32px] w-[236px]' />
        <Skeleton className='h-[32px] w-[236px]' />
      </div>
      <Skeleton className='h-[24px] w-[200px]' />
      <Skeleton className='h-[36px] w-[384px]' />
      <Skeleton className='h-[700px] w-[1000px]' />
    </div>
  );
}
