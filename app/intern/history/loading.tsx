import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Header */}
      <div className='flex flex-col gap-3 pb-4 animate-pulse'>
        <Skeleton className='h-8 w-64 bg-gray-300' />
        <Skeleton className='h-6 w-64 bg-gray-300' />
      </div>

      {/* Table */}
      <Skeleton className='h-72 w-full bg-gray-300' />
    </>
  )
}