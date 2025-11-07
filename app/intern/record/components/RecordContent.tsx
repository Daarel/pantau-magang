"use client";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import sertifDummy from "@/public/sertif-dummy.png";
import Sertificate from "@/components/Certificate";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { file } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RecordContentProps {
  userId: string;
  supervisorId: string;
  supervisorName: string;
  userName: string | null;
  start_date: string;
  end_date: string;
  department: string;
  templateUrl: string | null;
  requestInfo: boolean;
  signatureData: string;
}

export default function RecordContent({ userId, supervisorId, supervisorName, userName, start_date, end_date, department, templateUrl, requestInfo, signatureData }: RecordContentProps) {
  const [fileHasilKerja, setFileHasilKerja] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    if(uploadStatus === 'success')  {
      toast.success("File berhasil diunggah");
      const timer = setTimeout(() => {
        setUploadStatus('idle')
      }, 2000);
      return () => clearTimeout(timer);
    } else if(uploadStatus === 'error')  {
      toast.success("Terjadi kesalahan saat mengupload file. Silakan coba lagi.");
      const timer = setTimeout(() => {
        setUploadStatus('idle')
      }, 2000);
      return () => clearTimeout(timer);
    };
  }, [uploadStatus])

  useEffect(() => {
    if (templateUrl) {
      setCurrentTemplate(templateUrl);
    }
  }, [templateUrl]);

  const uploadRequestFile = async(file: File) => {
    const supabase = createClient();
    
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${originalName}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('requests_file')
      .upload(fileName, file);
  
    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  
    // Dapatkan URL file
    const { data: urlData } = supabase.storage
      .from('requests_file')
      .getPublicUrl(fileName);
  
    return urlData.publicUrl;
  }
  
  const insertCertificateRequests = async(fileUrl: string) => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
      .from("certificate_requests")
      .insert([
        {
          user_id: userId,
          supervisor_id: supervisorId,
          file_url: fileUrl,
          is_active: false
        }
      ])
      .select()
      
      if (error) {
        console.error("Error inserting certificate request:", error);
        throw error;
      }
  
      console.log("Certificate request inserted successfully:", data);
      return data;
  
    } catch (error) {
      console.error("Unexpected error in insertCertificateRequests:", error);
      throw error;
    }
  }

  const handleFileChange = (file: File | null) => {
    console.log("File received:", file);
    setFileHasilKerja(file);
    // Jika ingin membuat URL untuk preview, bisa ditambahkan di sini
    if (file) {
      console.log("File name:", file.name);
      console.log("File size:", file.size);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      console.log("File removed");
      setFileUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!fileHasilKerja) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // 1. Upload file ke storage
      const uploadedFileUrl = await uploadRequestFile(fileHasilKerja);
      
      // 2. Insert record ke database
      await insertCertificateRequests(uploadedFileUrl);
      
      setUploadStatus('success');
      console.log("Upload dan insert berhasil!");
      
      // Reset form setelah sukses
      setFileHasilKerja(null);
      setFileUrl(null);

      setTimeout(() => {
        router.push("/intern/record");
      }, 2000);

    } catch (error) {
      console.error("Error during upload:", error);
      setUploadStatus('error');

    } finally {
      setIsUploading(false);
    }
  };

  const preventRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  };

  // Handler untuk mencegah drag gambar (mencegah drag-to-download)
  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  };

  // Syarat & Ketentuan
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
      <div className="flex flex-col md:flex-row w-full items-stretch justify-center gap-4 pb-4">
        {/* Input */}
        <div className="flex flex-col w-full md:w-1/2">
          <FileUpload 
            titleName="Silakan unggah dokumen pendukung"
            onFileChange={handleFileChange}
            // containerClassName="bg-yellow-200"
            className="rounded-lg pb-4 h-full"
            buttonClassName="hover:bg-primary/10"
            accept=".pdf"
          />
          <Button 
            type="submit" 
            disabled={!fileHasilKerja}
            onClick={handleUpload}
            className={cn(
              "w-full active:bg-black/90 transition-colors duration-300 shadow",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            Upload
          </Button>
        </div>
        {/* Preview Sertificate */}
        <div className="w-full md:w-1/2">
          <Image
            src={templateUrl || sertifDummy}
            width={1200}
            height={800}
            alt='Overlay'
            priority
            className='border select-none'
            onContextMenu={preventRightClick}
            onDragStart={preventDragHandler}
            draggable={false}
          />
          <Sertificate 
            userName={userName}
            supervisorName={supervisorName}
            start_date={start_date}
            end_date={end_date}
            department={department}
            requestInfo={requestInfo}
            templateUrl={templateUrl}
            signatureData={signatureData}
          />
        </div>
      </div>

      {/* Syarat & Ketentuan */}
      <div className="text-[12px] md:text-[16px] text-gray-500">
        <p className="font-bold">Syarat dan Ketentuan Klaim Sertifikat Magang:</p>
        <ul className="list-decimal list-outside pl-3 sm:pl-4 space-y-1">
          {sk.map((item, index) => (
            <li key={index} className="normal-case">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
