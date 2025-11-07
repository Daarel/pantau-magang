import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToIndonesian(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateString}`);
      return dateString;
    }
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    return `${day} ${months[month]} ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export const capitalize = (str: string) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

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

// Fungsi untuk format kolom bertipe TIME
export const formatTime = (timeValue: string | null): string => {
  if (!timeValue) return "-";

  try {
    // Asumsikan timeValue berupa string "HH:mm:ss"
    const [hours, minutes, seconds] = timeValue.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "-";
  }
}

// Fungsi untuk format kolom bertipe TIMESTAMP / TIMESTAMPTZ
export const formatTimeStamp = (timestampValue: string | null): string => {
  if (!timestampValue) return "-";

  try {
    const date = new Date(timestampValue);
    if (isNaN(date.getTime())) return "-";

    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // biar format 24 jam
    });
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "-";
  }
}

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
      return { class: "text-[11px] md:text-[16px] bg-green-100 text-green-800", text: "Hadir" };
    case "sakit":
      return { class: "text-[11px] md:text-[16px] bg-yellow-100 text-yellow-800", text: "Sakit" };
    case "izin":
      return { class: "text-[11px] md:text-[16px] bg-blue-100 text-blue-800", text: "Izin" };
    case "alfa":
      return { class: "text-[11px] md:text-[16px] bg-red-100 text-red-800", text: "Alfa" };
    default:
      return { class: "text-[11px] md:text-[16px] bg-gray-100 text-gray-800", text: "Belum Tercatat" };
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

// Format nama maksimal 3 kata
export const formatNama = (nama: string): string => {
  const kata = nama.trim().split(/\s+/);
  return kata.slice(0, 3).join(' ');
};

// Fungsi untuk mengkompresi gambar
export const compressImage = (file: File, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context tidak tersedia'));
          return;
        }
        
        // Hitung ukuran baru dengan menjaga aspect ratio
        let { width, height } = img;
        const MAX_DIMENSION = 1200; // Maksimal dimensi untuk mengurangi ukuran
        
        if (width > height && width > MAX_DIMENSION) {
          height = (height * MAX_DIMENSION) / width;
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width = (width * MAX_DIMENSION) / height;
          height = MAX_DIMENSION;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Gambar ulang gambar dengan ukuran yang dikompresi
        ctx.drawImage(img, 0, 0, width, height);
        
        // Konversi ke blob dengan kualitas yang disesuaikan
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Gagal mengkompres gambar'));
              return;
            }
            
            // Buat nama file baru dengan timestamp
            const fileName = `compressed_${Date.now()}.jpg`;
            const newFile = new File([blob], fileName, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            
            resolve(newFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Gagal memuat gambar'));
    };
    reader.onerror = () => reject(new Error('Gagal membaca file'));
  });
};

// Fungsi untuk memeriksa dan mengkompresi gambar jika diperlukan
export const processImage = async (file: File, maxSizeMB = 2): Promise<File> => {
  const MAX_SIZE = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  
  // Jika file sudah di bawah ukuran maksimal, langsung return
  if (file.size <= MAX_SIZE) {
    return file;
  }
  
  let compressedFile = file;
  let quality = 0.8; // Kualitas awal
  
  // Coba kompresi dengan kualitas yang semakin rendah (maksimal 5 percobaan)
  for (let i = 0; i < 5; i++) {
    try {
      compressedFile = await compressImage(compressedFile, quality);
      
      // Jika sudah di bawah ukuran maksimal, berhenti
      if (compressedFile.size <= MAX_SIZE) {
        return compressedFile;
      }
      
      // Turunkan kualitas untuk percobaan berikutnya
      quality = Math.max(0.3, quality - 0.15); // Minimum quality 0.3
    } catch (error) {
      console.error('Error kompresi gambar:', error);
      throw new Error('Gagal mengkompres gambar');
    }
  }
  
  // Jika masih terlalu besar setelah beberapa percobaan, kembalikan file terkompresi terbaik
  return compressedFile;
};

// Kueri untuk mendapatkan data user dan supervisor_id
export const getUserData = async (supabase: any) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data: userData, error } = await supabase
    .from("users")
    .select("id, supervisor_id")
    .eq("auth_id", user.id)
    .single();

  if (error || !userData) throw new Error("User data not found");
  return userData;
};