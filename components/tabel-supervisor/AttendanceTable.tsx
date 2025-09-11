"use client";

import { useEffect, useState } from "react";
import { columns, reportColumns, Dashboardcolumns, Attendance, Report, Dashboard } from "./columns";
import { DataTable } from "./data-table";
import { supabase } from "@/lib/supabaseClient";

async function getAttendanceData(supervisorId: string): Promise<Attendance[]> {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      id,
      status,
      date,
      check_in_time,
      check_out_time,
      notes,
      dispensation,
      users!inner (
        full_name,
        supervisor_id
      )
    `)
    .eq("users.supervisor_id", supervisorId)
    .or("dispensation.eq.approved,status.eq.hadir,status.eq.alfa")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }

  return (data ?? []).map((att: any) => ({
    name: att.users?.full_name ?? "Unknown",
    status: att.status.charAt(0).toUpperCase() + att.status.slice(1),
    keterangan: att.notes ?? "-",
    date: att.date,
    check_in_time: att.check_in_time
      ? new Date(att.check_in_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "-:-",
    check_out_time: att.check_out_time
      ? new Date(att.check_out_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "-:-",
  }));
}

function getReportData(): Report[] {
  return [
    { file: "report_andi.pdf", name: "Andi", status: "Izin", keterangan: "Izin ke kampus" },
    { file: "report_sandi.pdf", name: "Sandi", status: "Sakit", keterangan: "Izin Sakit" },
    { file: "report_andi.pdf", name: "Andi", status: "Sakit", keterangan: "Masih Sakit" },
    { file: "report_sandi.pdf", name: "Sandi", status: "Sakit", keterangan: "Ketularan Sakit" },
    { file: "report_dono.pdf", name: "Dono", status: "Izin", keterangan: "Main ke luar kota" },
    { file: "report_dono.pdf", name: "Dono", status: "Sakit", keterangan: "Demam tinggi" },
    { file: "report_sandi.pdf", name: "Sandi", status: "Izin", keterangan: "Tidak ada keterangan" },
    { file: "report_vior.pdf", name: "Vior", status: "Izin", keterangan: "Nikah" },
  ];
}

async function getDashboardData(supervisorId: string): Promise<Dashboard[]> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  const { data, error } = await supabase
    .from("attendance")
    .select(`
      id,
      status,
      check_in_time,
      check_out_time,
      date,
      dispensation,
      users!inner (
        full_name,
        institution,
        supervisor_id
      )
    `)
    .eq("users.supervisor_id", supervisorId)
    .eq("date", today)
    .or("dispensation.eq.approved,status.eq.hadir,status.eq.alfa")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching dashboard data:", error);
    return [];
  }

  return (data ?? []).map((att: any) => ({
    name: att.users?.full_name ?? "Unknown",
    status: att.status,
    institutions: att.users?.institution ?? "-",
    check_in_time: att.check_in_time
      ? new Date(att.check_in_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-:-",
    check_out_time: att.check_out_time
      ? new Date(att.check_out_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-:-",
  }));
}

export default function AttendanceTable({
  activeTab,
  supervisorId,
}: {
  activeTab: string;
  supervisorId: string;
}) {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  useEffect(() => {
    getAttendanceData(supervisorId).then(setAttendanceData);
  }, [supervisorId]);

  const filteredData =
    activeTab === "Semua Daftar"
      ? attendanceData
      : attendanceData.filter((item) => item.status === activeTab);

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={filteredData}
        enableFilter={false}
        enableColumnVisibility={false}
      />
    </div>
  );
}

// Komponen khusus Report
export function ReportTable({ activeTab }: { activeTab: string }) {
  const reportData = getReportData();

  const filteredData =
    activeTab === "Semua Daftar"
      ? reportData
      : reportData.filter((item) => item.status === activeTab);

  return (
    <div className="w-full">
      <DataTable
        columns={reportColumns}
        data={filteredData}
        enableFilter={false}
        enableColumnVisibility={false}
      />
    </div>
  );
}

export function DashboardTable({ supervisorId }: { supervisorId: string }) {
  const [dashboardData, setDashboardData] = useState<Dashboard[]>([]);

  useEffect(() => {
    getDashboardData(supervisorId).then(setDashboardData);
  }, [supervisorId]);

  return (
    <div className="w-full">
      <DataTable
        columns={Dashboardcolumns}
        data={dashboardData}
        enableFilter={false}
        enableColumnVisibility={false}
        title="Status Kehadiran Hari Ini"
      />
    </div>
  );
}
