export type AttendanceRecord = {
  id: number;
  status: string;
  date: Date;
  latitude: number;
  longitude: number;
  location: string;
  address: string;
  imageUrl: string; // simpan URL string di database
  description: string;
};
