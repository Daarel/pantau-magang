// src/components/AttendanceHistory.tsx
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import AttendanceClient from "@/app/supervisor/attendance/component/AttendanceClient";

export default async function Attendance() {
  return (
    <LayoutWrapper>
      <AttendanceClient/>
    </LayoutWrapper>
  );
}
