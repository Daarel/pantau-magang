"use client";

import { useEffect, useState } from "react";
import {
  columns,
  reportColumns,
  Dashboardcolumns,
  Attendance,
  Report,
  Dashboard,
} from "./columns";
import { DataTable } from "./data-table";
import { createClient } from "@/lib/supabase/client";

async function getAttendanceData(supervisorId: string): Promise<Attendance[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("attendance")
    .select(
      `
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
    `
    )
    .eq("users.supervisor_id", supervisorId)
    .or("dispensation.eq.approved,dispensation.eq.n_approved,dispensation.eq.-")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }

  return (data ?? []).map((att: any) => ({
    id: att.id,
    name: att.users?.full_name ?? "Unknown",
    status: att.status.charAt(0).toUpperCase() + att.status.slice(1),
    keterangan: att.notes ?? "-",
    date: att.date,
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

async function getReportData(supervisorId: string): Promise<Report[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("attendance")
    .select(
      `
      id,
      status,
      notes,
      dispensation,
      users!inner (
        full_name,
        supervisor_id
      )
    `
    )
    .eq("users.supervisor_id", supervisorId)
    .eq("dispensation", "pending") // cuma ambil yang masih pending
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching report data:", error);
    return [];
  }

  return (data ?? []).map((att: any) => ({
    id: att.id,
    file: `report_${att.users?.full_name?.toLowerCase()}.pdf`, // sementara generate nama file
    name: att.users?.full_name ?? "Unknown",
    status: att.status.charAt(0).toUpperCase() + att.status.slice(1),
    keterangan: att.notes ?? "-",
  }));
}

async function getDashboardData(supervisorId: string): Promise<Dashboard[]> {
  const supabase = createClient();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  const { data, error } = await supabase
    .from("attendance")
    .select(
      `
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
    `
    )
    .eq("users.supervisor_id", supervisorId)
    .eq("date", today)
    .or("dispensation.eq.approved,dispensation.eq.n_approved,dispensation.eq.-")
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

  const fetchData = async () => {
    const data = await getAttendanceData(supervisorId);
    setAttendanceData(data);
  };

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
        columns={columns(fetchData)}
        data={filteredData}
        enableFilter={true}
        enableColumnVisibility={false}
      />
    </div>
  );
}

// Komponen khusus Report
export function ReportTable({
  activeTab,
  supervisorId,
}: {
  activeTab: string;
  supervisorId: string;
}) {
  const [reportData, setReportData] = useState<Report[]>([]);

  const fetchData = async () => {
    const data = await getReportData(supervisorId);
    setReportData(data);
  };

  useEffect(() => {
    getReportData(supervisorId).then(setReportData);
  }, [supervisorId]);

  const filteredData =
    activeTab === "Semua Daftar"
      ? reportData
      : reportData.filter((item) => item.status === activeTab);

  return (
    <div className="w-full">
      <DataTable
        columns={reportColumns(fetchData)}
        data={filteredData}
        enableFilter={true}
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
