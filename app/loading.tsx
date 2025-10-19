import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Skeleton className='w-screen h-[80px]' />
      <Skeleton className='w-[200px] flex-1 rounded-none' />
    </div>
  );
}
