import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format tanggal menjadi dd/mm/yy
export const formatDate = (dateString: string | null): string => {
  if (!dateString || dateString === "-" || dateString === null) return "-";
  
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};

// Format waktu menjadi HH:MM
// export const formatTime = (timeString: string | null): string => {
//   if (!timeString || timeString === "-" || timeString === null) return "-";

//   try {
//     let dateObj: Date;

//     // Jika hanya berupa HH:mm:ss, gabungkan dengan tanggal hari ini
//     if (/^\d{2}:\d{2}(:\d{2})?$/.test(timeString)) {
//       const today = new Date();
//       const isoDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
//       dateObj = new Date(`${isoDate}T${timeString}`);
//     } else {
//       // Anggap string sudah ISO valid
//       dateObj = new Date(timeString);
//     }

//     // Ambil Jam & Menit saja
//     return dateObj.toLocaleTimeString("id-ID", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   } catch (error) {
//     console.error("Error formatting time:", error);
//     return "-";
//   }
// };

// Format waktu menjadi HH:MM
export const formatTime = (timeString: string | null): string => {
  if (!timeString || timeString === "-" || timeString === null) return "-";

  try {
    // Handle format time PostgreSQL (HH:mm:ss)
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(timeString)) {
      const [hours, minutes] = timeString.split(':');
      return `${hours.padStart(2, '0')}:${minutes}`;
    }

    // Handle format timestamp dengan time zone
    // Jika string kosong atau invalid, return "-"
    if (timeString.trim() === "" || timeString === "null") {
      return "-";
    }
    
    // Handle format timestamp dengan time zone
    const dateObj = new Date(timeString);
    
    // Validasi jika dateObj invalid
    if (isNaN(dateObj.getTime())) {
      return "-";
    }

    return dateObj.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "-";
  }
};

// Potong teks jika lebih dari jumlah kata tertentu
export const truncateText = (text: string, maxWords: number = 15): string => {
  if (!text || text === "-") return "-";
  
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

// Ubah warna background berdasarkan status kehadiran
export const statusColor = (status: string): { class: string; text: string } => {
  switch (status) {
    case "hadir":
      return { class: "bg-green-100 text-green-800", text: "Hadir" };
    case "sakit":
      return { class: "bg-yellow-100 text-yellow-800", text: "Sakit" };
    case "izin":
      return { class: "bg-blue-100 text-blue-800", text: "Izin" };
    case "alfa":
      return { class: "bg-red-100 text-red-800", text: "Alfa" };
    default:
      return { class: "bg-gray-100 text-gray-800", text: status };
  }
}

// Hitung jumlah hari kerja dalam bulan ini
export const getWorkdaysInMonth = (): number => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() // 0-11

  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0)

  let workdays = 0
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay()
    if (day >= 1 && day <= 5) workdays++ // Senin(1) - Jumat(5)
  }
  return workdays
}