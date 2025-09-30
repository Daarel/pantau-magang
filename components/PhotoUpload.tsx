// components/PhotoUpload.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { TbCameraPlus } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { toast } from "sonner";
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface PhotoUploadProps {
  onPhotoChange: (file: File | null) => void;
}

export function PhotoUpload({ onPhotoChange }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check file size (max 3MB)
      if (file.size > 3 * 1024 * 1024) {
        toast.error("Ukuran foto melebihi 3 MB");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("File harus berupa gambar");
        return;
      }
      
      setSelectedFile(file);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onPhotoChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    onPhotoChange(null);
  };

  return (
    <div className="flex flex-col w-full items-center xl:items-start">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="relative flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 overflow-hidden">
          <Image
            src={previewUrl}
            alt="Preview"
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
          className="flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 bg-gray-200"
          onClick={(e) => { e.preventDefault(); handleClick(); }}
        >
          <TbCameraPlus className="w-4 h-4" />
          <span>Tambahkan foto</span>
        </Button>
      )}
      
      <div className="flex items-center gap-1 text-sm text-black/40">
        <AiOutlineInfoCircle className="w-4 h-4" />
        <h6>Ukuran foto maks. 3 MB</h6>
      </div>
    </div>
  );
}