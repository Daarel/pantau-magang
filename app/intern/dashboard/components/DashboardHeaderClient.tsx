'use client';
import { formatNama } from "@/lib/utils";
import DashboardClock from "@/components/DashboardClock";
import Image from "next/image";
import { internSummary } from "@/types/intern";

interface internDashboardHeaderProps {
  internData: internSummary | null;
}

export default function DashboardHeader({ internData }: internDashboardHeaderProps) {
  return (
    <div className='relative bg-blue-500 space-y-2 mb-2 md:mb-4 h-48 p-4 lg:p-8 rounded-lg overflow-hidden'>
      <Image
        src='/overlayBuilding.webp'
        alt='Overlay'
        fill
        priority
        className='absolute inset-0 object-cover opacity-25 z-0'
      />

      <div className='relative z-10'>
        <h1 className='title_header capitalize'>
          Selamat Datang, {internData?.nama ? formatNama(internData.nama) : "-"}
        </h1>
        <DashboardClock />
      </div>
    </div>
  );
}