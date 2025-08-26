// components/PhotoUpload.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { TbCameraPlus } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { toast } from "sonner";

interface PhotoUploadProps {
  onPhotoChange: (file: File | null, previewUrl: string | null) => void;
}

export function PhotoUpload({ onPhotoChange }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved photo from localStorage on component mount
  useEffect(() => {
    const savedPhoto = localStorage.getItem('attendancePhoto');
    if (savedPhoto) {
      setPreviewUrl(savedPhoto);
      onPhotoChange(null, savedPhoto);
    }
  }, [onPhotoChange]);

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
      
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onPhotoChange(file, result);
        
        // Save to localStorage
        localStorage.setItem('attendancePhoto', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    onPhotoChange(null, null);
    localStorage.removeItem('attendancePhoto');
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
        <div className="flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className='w-full h-full object-cover'
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removePhoto}
          >
            Hapus
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 bg-gray-200"
          onClick={handleClick}
        >
          <TbCameraPlus className="w-4 h-4" />
          <span>Tambahkan foto</span>
        </Button>
      )}
      
      <div className="flex items-center gap-1 text-black/40">
        <AiOutlineInfoCircle className="w-4 h-4" />
        <h6 className="h6">Ukuran foto maks. 3 MB</h6>
      </div>
    </div>
  );
}