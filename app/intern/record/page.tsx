'use client'
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import sertifDummy from "@/public/sertif-dummy.png";
import Sertificate from "@/components/Certificate";

export default function InternRecord() {
  const [fileHasilKerja, setFileHasilKerja] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  const handleFileChange = (file: File | null) => {
    setFileHasilKerja(fileHasilKerja);
    setFileUrl(fileUrl);
  };

  const sk = [
    'Peserta wajib mengunggah laporan hasil kerja magang dan absensi magang melalui sistem yang telah disediakan.', 
    'Sertifikat hanya dapat diberikan kepada peserta dengan tingkat kehadiran minimal 75% selama periode magang.', 
    'Laporan hasil kerja magang dapat diunggah paling lambat 1 (satu) minggu sebelum periode magang selesai.', 
    'Sertifikat hanya dapat diklaim setelah seluruh syarat terpenuhi dan dilakukan paling lambat hingga hari terakhir periode magang.'
  ];

  return (
    <div className='flex flex-col min-h-dvh gap-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='h4 font-semibold'>Upload Hasil Kerja Anda</h1>
          <p className='text-gray-500'>
            Unggah untuk mengklaim sertifikat Anda
          </p>
        </div>
      </div>

      {/* Input & Preview Sertificate */}
      <div className="flex flex-col-reverse items-center justify-center gap-4 md:flex-row pb-4">
        {/* Input */}
        <div className="w-full md:w-1/2">
          <FileUpload 
            onFileChange={handleFileChange}
            cardClassName=""
            className="rounded-lg pb-4"
            buttonClassName="hover:bg-primary/10"
          />
          <Button 
            type="submit" 
            className="w-full active:bg-black/90 transition-colors duration-100 shadow"
          >
            Upload
          </Button>
        </div>
        {/* Preview Sertificate */}
        <div className="w-full md:w-1/2">
          <Image
            src={sertifDummy}
            alt='Overlay'
            priority
            className='border'
          />
          <Sertificate userName="Bahlul"/>
        </div>
      </div>

      {/* Syarat & Ketentuan */}
      <div className="text-[12px] md:text-[16px] text-gray-500">
        <p className="font-bold">Syarat dan Ketentuan Klaim Sertifikat Magang:</p>
        <ul className="list-decimal list-inside">
          {sk.map((item, index) => (
            <li key={index} className="normal-case">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
