import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 px-8 py-6">
      {/* Header */}
      <div className="relative bg-gray-50 space-y-3 mb-2 min-h-48 p-8 rounded-lg overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full opacity-30" />
        <div className="relative z-10 space-y-4">
          <Skeleton className="h-8 w-[280px] rounded-md bg-[#ededed]" />
          {/* Selamat datang */}
          <Skeleton className="h-6 w-[160px] bg-[#ededed]" /> {/* Jam dashboard */}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex justify-center items-center gap-3 p-4 max-lg:flex-col">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-2 items-start">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-5 w-[80px]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Placeholder */}
      <div className="mt-4">
        <Skeleton className="h-6 w-[200px] mb-4" /> {/* Judul tabel */}
        <div className="border rounded-lg p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-0"
            >
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-5 w-[80px]" />
              <Skeleton className="h-5 w-[90px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
