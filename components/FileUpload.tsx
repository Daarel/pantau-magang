"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { TbFileUpload } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { toast } from "sonner";
import { FiX } from 'react-icons/fi';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export function FileUpload({ onFileChange }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error("Ukuran file melebihi 3 MB");
        return;
      }
      setSelectedFile(file);
      onFileChange(file);
      toast.success("File berhasil dipilih!");
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  const removeFile = () => {
    setSelectedFile(null);
    onFileChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
        <div className="flex flex-col justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 px-4">
          <p className="text-sm text-center truncate w-full">{selectedFile.name}</p>
          <p className="text-xs text-gray-500">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <Button
            type='button'
            variant="destructive"
            size="sm"
            onClick={(e) => { e.preventDefault(); removeFile(); }}
            className="mt-3"
          >
            <FiX className="mr-1" /> Hapus File
          </Button>
        </div>
      ) : (
        <Button
          type='button'
          variant="outline"
          className="flex flex-col justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 bg-gray-200"
          onClick={(e) => { e.preventDefault(); handleClick(); }}
        >
          <div className='flex gap-1 items-center'>
            <TbFileUpload className="w-6 h-6" />
            <span className="text-sm">Unggah File</span>
          </div>
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
