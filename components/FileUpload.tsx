// "use client";

// import { useState, useRef } from 'react';
// import { Button } from "@/components/ui/button";
// import { TbFileUpload } from 'react-icons/tb';
// import { AiOutlineInfoCircle } from 'react-icons/ai';
// import { toast } from "sonner";
// import { FiX } from 'react-icons/fi';

// interface FileUploadProps {
//   onFileChange: (file: File | null) => void;
// }

// export function FileUpload({ onFileChange }: FileUploadProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isDragOver, setIsDragOver] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     if (file) {
//       if (file.size > 3 * 1024 * 1024) {
//         toast.error("Ukuran file melebihi 3 MB");
//         return;
//       }
//       setSelectedFile(file);
//       onFileChange(file);
//       toast.success("File berhasil dipilih!");
//     }
//   };

//   const handleClick = () => fileInputRef.current?.click();

//   const removeFile = () => {
//     setSelectedFile(null);
//     onFileChange(null);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//    // Drag and drop handlers
//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragOver(false);
    
//     const file = e.dataTransfer.files?.[0] || null;
//     if (file) {
//       if (file.size > 3 * 1024 * 1024) {
//         toast.error("Ukuran file melebihi 3 MB");
//         return;
//       }
//       setSelectedFile(file);
//       onFileChange(file);
//       toast.success("File berhasil diunggah!");
//     }
//   };

//   return (
//     <div className="flex flex-col w-full items-center xl:items-start">
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//         className="hidden"
//       />

//       {selectedFile ? (
//         <div className="flex flex-col justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 px-4">
//           <p className="text-sm text-center truncate w-full">{selectedFile.name}</p>
//           <p className="text-xs text-gray-500">
//             {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//           </p>
//           <Button
//             type='button'
//             variant="destructive"
//             size="sm"
//             onClick={(e) => { e.preventDefault(); removeFile(); }}
//             className="mt-3"
//           >
//             <FiX className="mr-1" /> Hapus File
//           </Button>
//         </div>
//       ) : (
//         <div
//           className={`
//             relative w-full max-w-md border-2 border-dashed rounded-lg transition-colors
//             ${isDragOver 
//               ? 'border-primary bg-primary/5' 
//               : 'border-border hover:border-primary/50'
//             }
//           `}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <Button
//             type="button"
//             variant="ghost"
//             className="flex flex-col w-full h-48 p-6 gap-3 hover:bg-transparent"
//             onClick={(e) => { e.preventDefault(); handleClick(); }}
//           >
//             <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
//               <TbFileUpload className="w-6 h-6 text-primary" />
//             </div>
//             <div className="space-y-1">
//               <p className="text-sm font-medium text-foreground">
//                 Klik untuk mengunggah atau tarik dan lepas
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 PDF, DOC, DOCX, JPG, JPEG, PNG (maks. 3 MB)
//               </p>
//             </div>
//           </Button>
//         </div>
//         // <Button
//         //   type='button'
//         //   variant="outline"
//         //   className="flex flex-col justify-center items-center gap-2 border-dashed border-black/30 border-2 h-[200px] lg:h-[350px] w-[200px] lg:w-[350px] rounded-md mb-2 bg-gray-200"
//         //   onClick={(e) => { e.preventDefault(); handleClick(); }}
//         // >
//         //   <div className='flex gap-1 items-center'>
//         //     <TbFileUpload className="w-6 h-6" />
//         //     <span className="text-sm">Unggah File</span>
//         //   </div>
//         //   <span className="text-xs text-gray-500">(PDF, DOC, JPG, dll)</span>
//         // </Button>
//       )}
//       <div className="flex items-center gap-1 text-sm text-black/40">
//         <AiOutlineInfoCircle className="w-4 h-4" />
//         <h6>Ukuran file maks. 3 MB</h6>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { TbFileUpload } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { toast } from "sonner";
import { FiX } from 'react-icons/fi';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  buttonClassName?: string;
  infoClassName?: string;
  variant?: 'default' | 'compact' | 'large';
  orientation?: 'vertical' | 'horizontal';
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUpload({ 
  onFileChange, 
  className,
  containerClassName,
  cardClassName,
  buttonClassName,
  infoClassName,
  variant = 'default',
  orientation = 'vertical',
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxSize = 3
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
      container: 'h-32 w-full',
      icon: 'w-8 h-8',
      text: 'text-[8px] md:text-[10px]'
    },
    default: {
      container: 'h-48 w-full',
      icon: 'w-12 h-12',
      text: 'text-[12px] md:text-[14px]'
    },
    large: {
      container: 'h-64 w-full',
      icon: 'w-16 h-16',
      text: 'text-[14px] md:text-[16px]'
    }
  };

  const currentSize = sizeConfig[variant];

  return (
    <div className={cn(
      "flex flex-col w-full",
      orientation === 'horizontal' && "lg:flex-row lg:items-center lg:gap-6",
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
        <Card className={cn("w-full", currentSize.container, cardClassName)}>
          <CardContent className="p-6 h-full flex items-center justify-center">
            <div className={cn(
              "flex flex-col items-center gap-4 text-center",
              orientation === 'horizontal' && "lg:flex-row lg:text-left"
            )}>
              <div className={cn(
                "bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0",
                currentSize.icon
              )}>
                <TbFileUpload className={cn("text-primary", currentSize.icon)} />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <p className={cn("font-medium truncate", currentSize.text)}>
                  {selectedFile.name}
                </p>
                <p className={cn("text-muted-foreground", currentSize.text)}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size={variant === 'compact' ? 'sm' : 'default'}
                onClick={(e) => { e.preventDefault(); removeFile(); }}
                className={buttonClassName}
              >
                <FiX className="w-4 h-4 mr-2" />
                Hapus File
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={cn(
            "flex w-full border-2 border-dashed rounded-lg transition-colors",
            currentSize.container,
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
              "flex flex-col w-full h-full p-6 gap-3 hover:bg-transparent",
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
            <div className="space-y-1 text-center lg:text-left">
              <p className={cn("font-medium text-foreground", currentSize.text)}>
                Klik untuk mengunggah atau tarik dan lepas
              </p>
              <p className={cn("text-muted-foreground", currentSize.text)}>
                {accept.replace(/\./g, '').toUpperCase()} (maks. {maxSize} MB)
              </p>
            </div>
          </Button>
        </div>
      )}
      
      <div className={cn(
        "flex items-center gap-2 text-muted-foreground",
        currentSize.text,
        infoClassName
      )}>
        <AiOutlineInfoCircle className="w-4 h-4 flex-shrink-0" />
        <span>Ukuran file maksimal {maxSize} MB</span>
      </div>
    </div>
  );
}