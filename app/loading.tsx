import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col h-screen'>
      <Skeleton className='h-[80px] w-screen rounded-none' />
      <Skeleton className='w-[225px] flex-1 rounded-none' />
    </div>
  );
}
