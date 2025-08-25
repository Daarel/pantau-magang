export type AttendanceRecord = {
  id: number;
  status: string;
  date: Date;
  location: string;
  imageUrl: string; // simpan URL string di database
  description: string;
};
