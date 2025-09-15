export type internSummary = {
  user_id: string;
  supervisor_id: string;
  start_time: string;
  end_time: string;
  total_hadir: number;
  total_sakit_izin: number;
  total_alfa: number;
  total_dispensasi: number;
  total_hadir_bulanan: number;
};

export type InternDashboardAttendance = {
  user_id: string;
  last_check_in: string | null;
  last_check_out: string | null;
};