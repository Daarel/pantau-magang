import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Skeleton untuk header */}
      <div className='relative bg-gray-200 space-y-2 mb-2 md:mb-4 h-48 p-4 lg:p-8 rounded-lg overflow-hidden animate-pulse'>
        <div className='relative z-10 space-y-4'>
          <Skeleton className='h-8 w-64 bg-gray-300' />
          <Skeleton className='h-6 w-48 bg-gray-300' />
        </div>
      </div>

      {/* Skeleton untuk konten utama */}
      <div className='flex flex-col md:flex-row w-full gap-4 md:gap-6'>
        {/* Skeleton untuk bagian kiri (Attendance) */}
        <div className="flex flex-col w-full md:w-1/2 gap-4 md:gap-6">
          {/* Skeleton untuk Today's Attendance */}
          <div className='flex flex-col border-2 gap-6 py-4 px-5 rounded-md'>
            <div className='flex items-center justify-center gap-3'>
              <Skeleton className='w-6 h-6 rounded-full bg-gray-300' />
              <Skeleton className='h-6 w-40 bg-gray-300' />
            </div>
            
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
          <div className='flex flex-col w-full gap-4 sm:flex-row'>
            <div className='flex w-full gap-4'>
              {/* Skeleton untuk Kehadiran Bulan Ini */}
              <div className='flex w-1/2 p-4 items-center justify-center sm:justify-evenly border-2 rounded-md gap-4'>
                <Skeleton className='w-12 h-12 rounded-md bg-gray-300' />
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-4 w-20 bg-gray-300' />
                  <Skeleton className='h-6 w-16 bg-gray-300' />
                  <Skeleton className='h-4 w-16 bg-gray-300' />
                </div>
              </div>

              {/* Skeleton untuk Dispensasi */}
              <div className='flex w-1/2 p-4 border-2 items-center justify-center sm:justify-evenly rounded-md gap-4'>
                <Skeleton className='w-12 h-12 rounded-md bg-gray-300' />
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
          <div className='flex items-center justify-center w-full'>
            <Skeleton className='h-64 w-64 rounded-full bg-gray-300' />
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <Skeleton className='h-4 w-1/2 bg-gray-300' />
          </div>
        </div>
      </div>
    </div>
  );
}