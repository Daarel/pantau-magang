import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col p-6 min-h-screen gap-5'>
      <Skeleton className='h-[36px] w-[200px] bg-[#ededed]' />
      <Skeleton className='h-[24px] w-[384px] bg-[#ededed]' />
      <Skeleton className='h-[287px] w-[851px]' />
    </div>
  );
}
