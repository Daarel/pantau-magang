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
export const formatTime = (timeString: string | null): string => {
  if (!timeString || timeString === "-" || timeString === null) return "-";
  
  try {
    const time = new Date(timeString);
    return time.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
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

export const statusColor = (status: string): { class: string; text: string } => {
  switch (status) {
    case "Hadir":
      return { class: "bg-green-100 text-green-800", text: "Hadir" };
    case "Sakit":
      return { class: "bg-yellow-100 text-yellow-800", text: "Sakit" };
    case "Izin":
      return { class: "bg-blue-100 text-blue-800", text: "Izin" };
    case "Alfa":
      return { class: "bg-red-100 text-red-800", text: "Alfa" };
    default:
      return { class: "bg-gray-100 text-gray-800", text: status };
  }
}