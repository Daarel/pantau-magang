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
