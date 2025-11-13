// Helper function to check if current time is within schedule
export function isWithinSchedule(startTime: string, endTime: string): boolean {
  const now = new Date();
  const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                     now.getMinutes().toString().padStart(2, '0');
  
  return currentTime >= startTime && currentTime <= endTime;
}

// Helper function to get schedule message
export function getScheduleMessage(startTime: string, endTime: string): string {
  const now = new Date();
  const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                     now.getMinutes().toString().padStart(2, '0');
  
  if (currentTime < startTime) {
    return `Absen dibuka pukul ${startTime}`;
  } else if (currentTime > endTime) {
    return `Waktu absen telah berakhir (${endTime})`;
  }
  return "Silakan lakukan absensi";
}

export function isWeekend(): boolean {
  const today = new Date().getDay();
  return today === 0 || today === 6; // 0 = Minggu, 6 = Sabtu
}

export function getWeekendMessage(): string {
  return "Tidak ada jadwal absen";
}