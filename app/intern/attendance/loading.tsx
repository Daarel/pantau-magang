import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col gap-4 animate-pulse'>
      {/* Header */}
      <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
        <Skeleton className='h-8 w-1/2 sm:w-1/3 md:w-64 bg-gray-300' />
        <Skeleton className='h-6 w-1/2 sm:w-1/3 md:w-64 bg-gray-300' />
      </div>

      {/* Input & Preview Sertificate */}
      <div className="flex flex-col items-center justify-center gap-4 pb-4">
        {/* Input */}
        {/* Preview Sertificate */}
        <Skeleton className='h-64 w-full bg-gray-300' />
      </div>
    </div>
  )
}
