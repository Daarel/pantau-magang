// src/components/AttendanceHistory.tsx
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import ReportClient from "@/app/supervisor/reports/component/ReportClient";

export default async function Report() {
  return (
    <LayoutWrapper>
      <ReportClient />
    </LayoutWrapper>
  );
}
