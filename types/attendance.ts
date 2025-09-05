export type AttendanceRecord = {
  id: number;
  status: string;
  date: Date;
  latitude: number;
  longitude: number;
  address: string;
  location: string;
  imageUrl: string; // simpan URL string di database
  description: string;
};

export type AttendanceIntern = {
  id: number
  user_id: string
  date: string
  check_in_time: string | null
  check_out_time: string | null
  status: "Hadir" | "Sakit" | "Izin" | "Alfa"
  notes: string
  file_url: string
  dispensation: "pending" | "approved" | "n_approved"
  created_at: string
  updated_at: string
}