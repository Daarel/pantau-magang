import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row'>
        <Skeleton className='w-screen h-[200px]' />
      </div>
      <div className='flex flex-row'>
        <Skeleton className='h-full w-[255px]' />
      </div>
    </div>
  );
}
