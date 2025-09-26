import { useRouter } from "next/navigation";
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { UpdateCheckOutTime } from "@/hooks/useAttendance";
import { createClient } from '@/lib/supabase/client'

export function CheckOutModal() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      // Dapatkan user data dari localStorage
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error('User not authenticated');
        return;
      }

      // Dapatkan user_id dari tabel users berdasarkan auth_id
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      const userId = userData.id;

      if (!userId) {
        throw new Error('ID user tidak valid');
      }

      // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];

      // Update check_out_time
      await UpdateCheckOutTime(userId, today);

      toast.success("Absensi pulang berhasil dicatat");
      setIsOpen(false);
      
      // Refresh halaman untuk memperbarui data
      router.refresh();
    } catch (error) {
      console.error('Error during check-out:', error);
      toast.error('Gagal melakukan absensi pulang');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          className='w-full bg-red-200 hover:bg-red-300 border-red-700 active:bg-red-400 transition-colors duration-100 shadow'
        >
          <h5 className='text-black/80 font-bold'>Absen Pulang</h5>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin mau pulang sekarang?</AlertDialogTitle>
          <AlertDialogDescription>
            Perhatian: Setelah Anda menekan tombol Absen Pulang, data akan disimpan permanen. Tidak ada opsi untuk mengedit atau membatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-red-200 hover:bg-red-300"
            disabled={isLoading}
          >
            Batalkan
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-green-200 hover:bg-green-300 text-black"
            onClick={handleCheckOut}
            disabled={isLoading}
          >
            { isLoading? "Memproses" : "Konfirmasi" }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
