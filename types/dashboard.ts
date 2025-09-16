export type internSummary = {
  user_id: string;
  supervisor_id: string;
  nama: string;
  start_time: string;
  end_time: string;
  total_hadir: number;
  total_sakit_izin: number;
  total_alfa: number;
  total_dispensasi: number;
  total_hadir_bulanan: number;
  today_check_in: string | null;
  today_check_out: string | null;
  status: string | null;
};