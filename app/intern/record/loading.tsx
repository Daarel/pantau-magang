import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col min-h-dvh gap-4 animate-pulse'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-9 bg-gray-300' />
          <Skeleton className='h-6 w-64 bg-gray-300' />
        </div>
      </div>

      {/* Input & Preview Sertificate */}
      <div className="flex flex-col items-center justify-center gap-4 pb-4">
        {/* Input */}
        {/* Preview Sertificate */}
        <Skeleton className='h-56 w-full bg-gray-300' />
      </div>

      {/* Syarat & Ketentuan */}
      <Skeleton className='h-6 w-1/3 bg-gray-300' />
      <Skeleton className='h-36 w-full bg-gray-300' />
    </div>
  )
}
