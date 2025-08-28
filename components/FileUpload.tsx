// components/FileUpload.tsx
"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { TbFileUpload } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { toast } from "sonner";
import { FiFile, FiX } from 'react-icons/fi';

interface FileUploadProps {
  onFileChange: (file: File | null, fileUrl: string | null) => void;
}

export function FileUpload({ onFileChange }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check file size (max 3MB)
      if (file.size > 3 * 1024 * 1024) {
        toast.error("Ukuran file melebihi 3 MB");
        return;
      }
      
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        onFileChange(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📎';
    }
  };

  return (
    <div className="flex flex-col w-full items-center xl:items-start">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        className="hidden"
      />
      
      {selectedFile ? (
        <div className="flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2">
          <div className="text-2xl">{getFileIcon(selectedFile.name)}</div>
          <p className="text-sm text-center truncate w-full">{selectedFile.name}</p>
          <p className="text-xs text-gray-500">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <Button
            variant="destructive"
            size="sm"
            onClick={removeFile}
            className="mt-2"
          >
            <FiX className="mr-1" /> Hapus
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="flex justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 bg-gray-200"
          onClick={handleClick}
        >
          <TbFileUpload className="w-6 h-6" />
          <span className="text-sm">Unggah File</span>
          <span className="text-xs text-gray-500">(PDF, DOC, JPG, dll)</span>
        </Button>
      )}
      
      <div className="flex items-center gap-1 text-sm text-black/40">
        <AiOutlineInfoCircle className="w-4 h-4" />
        <h6>Ukuran file maks. 3 MB</h6>
      </div>
    </div>
  );
}