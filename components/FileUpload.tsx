"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { TbFileUpload } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from "sonner";
import { FiX } from 'react-icons/fi';
import { Card, CardContent } from "@/components/ui/card";
import { FaFilePdf } from 'react-icons/fa';
import { cn } from "@/lib/utils";
import { FileUploadProps } from '@/types/attendance';

export function FileUpload({ 
  onFileChange, 
  className,
  containerClassName,
  cardClassName,
  buttonClassName,
  infoClassName,
  variant = 'default',
  orientation = 'vertical',
  titleName = "Klik untuk mengunggah atau tarik dan lepas",
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxSize = 2,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        toast.error(`Ukuran file melebihi ${maxSize} MB`);
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        toast.error(`Ukuran file melebihi ${maxSize} MB`);
        return;
      }
      setSelectedFile(file);
      onFileChange(file);
      toast.success("File berhasil diunggah!");
    }
  };

  // Size variants
  const sizeConfig = {
    compact: {
      icon: 'w-8 h-8',
      text: 'text-[8px] md:text-[10px]'
    },
    default: {
      icon: 'w-12 h-12',
      text: 'text-[12px] md:text-[14px]'
    },
    large: {
      icon: 'w-16 h-16',
      text: 'text-[14px] md:text-[16px]'
    }
  };

  const currentSize = sizeConfig[variant];

  return (
    <div className={cn(
      // "flex flex-col",
      orientation === 'horizontal' && "lg:flex-row lg:items-center",
      className
    )}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      
      {selectedFile ? (
        <div className="flex h-full p-4 justify-center items-center border-2 border-dashed rounded-lg gap-3">
          <div className='flex w-full justify-center items-center gap-2'>
            <FaFilePdf className='w-6 h-6' />
            <div className="flex flex-col min-w-0">
              <p className={cn("font-medium truncate", currentSize.text)}>
                {selectedFile.name}
              </p>
              <p className={cn("text-muted-foreground", currentSize.text)}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size={variant === 'compact' ? 'sm' : 'default'}
            onClick={(e) => { e.preventDefault(); removeFile(); }}
            className="bg-white/10 hover:bg-red-200 place-item-end"
          >
            <AiOutlineDelete className="text-bold w-8 h-8" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "flex w-full border-2 border-dashed rounded-lg transition-colors h-full",
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50',
            containerClassName
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "flex flex-col w-full h-full p-4 gap-3 hover:bg-transparent",
              orientation === 'horizontal' && "lg:flex-row lg:items-center",
              buttonClassName
            )}
            onClick={(e) => { e.preventDefault(); handleClick(); }}
          >
            <div className={cn(
              "bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0",
              currentSize.icon
            )}>
              <TbFileUpload className={cn("text-primary", currentSize.icon)} />
            </div>
            <div className="space-y-1 text-center">
              <p className={cn("font-medium text-foreground", currentSize.text)}>
                {titleName}
              </p>
              <p className={cn("text-muted-foreground", currentSize.text)}>
                {accept.replace(/\./g, '').toUpperCase()} (maks. {maxSize} MB)
              </p>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}