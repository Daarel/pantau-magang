"use client";
import { useState } from 'react'
import { InternAttendanceTable } from './today-intern-status/page';
import { AttendanceIntern } from '@/types/attendance';

interface TabData {
  tabName: string;
  data: AttendanceIntern[];
}
interface tabNavigationProps {
  tabData: TabData[];
}

export default function TabNavigation({ tabData }: tabNavigationProps) {
  const [activeTab, setActiveTab] = useState<string>("Semua Riwayat");
  const activeTabData = tabData.find(tab => tab.tabName === activeTab)?.data || [];
  return (
    <div className="flex flex-col border-2 rounded-lg p-2">
      <div className='flex gap-6 border-b text-[14px] md:text-[16px] justify-evenly sm:justify-normal'>
        {tabData.map((tab) => (
          <button
            key={tab.tabName}
            onClick={() => setActiveTab(tab.tabName)}
            className={`pb-2 cursor-pointer ${
              activeTab === tab.tabName
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.tabName}
          </button>
        ))}
        {/* Content */}
      </div>
      <div className='space-y-4'>
        <InternAttendanceTable data={activeTabData} />
      </div>
    </div>
  )
}
