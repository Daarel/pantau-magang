import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

export default function NotAuthorized() {
  return (
    <Card className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center'>
      <CardHeader className='mb-2'>
        <CardTitle className='text-4xl md:text-5xl font-bold text-gray-800 '>
          403 - Akses Ditolak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-gray-600 mb-6 max-w-md'>
          Maaf, kamu tidak memiliki izin untuk mengakses halaman ini.
          Pastikan akun kamu memiliki hak akses yang sesuai.
        </p>
        <Link href='/' className="flex flex-row justify-center items-center gap-2 hover:text-blue-500">
          <span>kembali ke halaman login</span><FaArrowRight />
        </Link>
      </CardContent>
    </Card>
  );
}
