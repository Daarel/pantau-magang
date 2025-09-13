export type AttendanceCheckIn = {
  user_id: string;
  status: string;
  date: string;
  notes: string | null;
  file_url: string | null;
  check_in_time: string | null;
  dispensation: string | null;
};

export type AttendanceCheckOut = {
  check_out_time: string;
}

export type AttendanceIntern = {
  id: number
  user_id: string
  date: string
  check_in_time: string | null
  check_out_time: string | null
  status: "hadir" | "sakit" | "izin" | "alfa"
  notes: string
  file_url: string
  dispensation: "pending" | "approved" | "n_approved"
  created_at: string
  updated_at: string
}