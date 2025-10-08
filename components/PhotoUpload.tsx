// components/PhotoUpload.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { TbCameraPlus } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { toast } from "sonner";
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { PhotoUploadProps } from '@/types/attendance';
import { compressImage, processImage } from '@/lib/utils';

export function PhotoUpload({ onPhotoChange, maxSize = 2 }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check file size (max 2MB)
      // if (file.size > maxSize * 1024 * 1024) {
      //   toast.error(`Ukuran foto melebihi ${maxSize} MB`);
      //   return;
      // }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("File harus berupa gambar");
        return;
      }
      
      setIsCompressing(true);

      try {
        // Proses kompresi gambar - gunakan processImage bukan compressImage
        const processedFile = await processImage(file, maxSize);
        
        // Cek apakah file hasil kompresi masih melebihi batas
        if (processedFile.size > maxSize * 1024 * 1024) {
          const finalSizeMB = (processedFile.size / (1024 * 1024)).toFixed(2);
          toast.warning(`Gambar masih ${finalSizeMB}MB setelah kompresi maksimal`);
        }
        
        setSelectedFile(processedFile);
        const previewUrl = URL.createObjectURL(processedFile);
        setPreviewUrl(previewUrl);
        onPhotoChange(processedFile);
        
        // Tampilkan info ukuran setelah kompresi
        const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const compressedSizeMB = (processedFile.size / (1024 * 1024)).toFixed(2);
        
        // if (processedFile.size < file.size) {
        //   toast.success(`Gambar dikompresi dari ${originalSizeMB}MB menjadi ${compressedSizeMB}MB`);
        // }
      } catch (error) {
        console.error('Error processing image:', error);
        toast.error('Terjadi kesalahan saat memproses gambar');
        // Reset input file jika error
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col w-full items-center xl:items-start">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      
      {isCompressing ? (
        <div className="flex flex-col justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 bg-gray-200">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-center text-sm">Mengkompresi gambar...</p>
        </div>
      ) : previewUrl ? (
        <div className="relative flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 overflow-hidden">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className='w-full h-full object-cover'
          />
          <Button
            type='button'
            // variant="destructive"
            size="sm"
            className="absolute top-1 right-1 bg-red-400/70 hover:bg-red-500/90 text-white/80 hover:text-white p-1 rounded-lg"
            onClick={(e) => { e.preventDefault(); removePhoto(); }}
          >
            <FaTrash />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="flex flex-col justify-center items-center border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md bg-gray-200"
          onClick={(e) => { e.preventDefault(); handleClick(); }}
        >
          <div className='flex gap-2'>
            <TbCameraPlus className="w-4 h-4" />
            <span>Tambahkan foto</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-black/40">
            <h6>Ukuran foto maks. {maxSize} MB</h6>
          </div>
        </Button>
      )}
    </div>
  );
}