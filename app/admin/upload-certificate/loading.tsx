import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-2'>
      <Skeleton className='h-[500px] w-[500px]' />
    </div>
  );
}
