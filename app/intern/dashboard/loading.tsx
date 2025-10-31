import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Skeleton untuk header */}
      <div className='relative bg-gray-200 space-y-2 mb-2 md:mb-4 h-48 p-4 lg:p-8 rounded-lg overflow-hidden animate-pulse'>
        <div className='relative z-10 space-y-4'>
          <Skeleton className='h-8 w-64 bg-gray-300' />
          <Skeleton className='h-6 w-48 bg-gray-300' />
        </div>
      </div>

      {/* Skeleton untuk konten utama */}
      <div className='flex flex-col md:flex-row w-full gap-2 md:gap-4'>
        {/* Skeleton untuk bagian kiri (Attendance) */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 md:gap-4">
          {/* Skeleton untuk Today's Attendance */}
          <div className='flex flex-col border-2 gap-6 py-4 px-5 rounded-md'>
            {/* Header */}
            <div className='flex items-center justify-center gap-3'>
              <Skeleton className='w-6 h-6 rounded-full bg-gray-300' />
              <Skeleton className='h-6 w-40 bg-gray-300' />
            </div>
            {/* Status */}
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <Skeleton className='h-5 w-16 bg-gray-300' />
                <Skeleton className='h-6 w-20 bg-gray-300' />
              </div>
              <div className='flex justify-between'>
                <Skeleton className='h-5 w-20 bg-gray-300' />
                <Skeleton className='h-6 w-24 bg-gray-300' />
              </div>
            </div>
            
            <Skeleton className='h-10 w-full bg-gray-300' />
          </div>

          {/* Skeleton untuk statistik */}
          <div className='flex flex-col w-full gap-2 md:gap-4 sm:flex-row'>
            <div className='flex w-full gap-2 sm:gap-4'>
              {/* Skeleton untuk Kehadiran Bulan Ini */}
              <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
                <Skeleton className='p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md bg-gray-300' />
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-4 w-20 bg-gray-300' />
                  <Skeleton className='h-6 w-16 bg-gray-300' />
                  <Skeleton className='h-4 w-16 bg-gray-300' />
                </div>
              </div>

              {/* Skeleton untuk Dispensasi */}
              <div className='flex w-1/2 p-4 border-2 items-center justify-center sm:justify-evenly rounded-md gap-4'>
                <Skeleton className='p-3 w-11 lg:w-13 h-11 lg:h-13 rounded-md bg-gray-300' />
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-4 w-20 bg-gray-300' />
                  <Skeleton className='h-6 w-16 bg-gray-300' />
                  <Skeleton className='h-4 w-16 bg-gray-300' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton untuk PieChart */}
        <div className='flex flex-col w-full md:w-1/2 border-2 gap-4 py-4 px-5 rounded-md'>
          {/* Header */}
          <div className='flex items-center justify-center gap-3'>
            <Skeleton className='w-6 h-6 rounded-full bg-gray-300' />
            <Skeleton className='h-6 w-40 bg-gray-300' />
          </div>
          <div className='flex items-center justify-center w-full'>
            <Skeleton className='h-48 w-48 rounded-full bg-gray-300' />
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <Skeleton className='h-4 w-1/2 bg-gray-300' />
          </div>
        </div>
      </div>
    </>
  );
}