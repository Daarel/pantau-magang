// import { useRouter } from "next/navigation";
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

export function CheckOutModal() {
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
          <AlertDialogCancel className="bg-red-200 hover:bg-red-300">Batalkan</AlertDialogCancel>
          <AlertDialogAction className="bg-green-200 hover:bg-green-300 text-black">Konfirmasi</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
