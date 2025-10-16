"use client";

import { useRef, useState, useEffect, DragEvent } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { FiSave } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";
import { HiOutlineTrash, HiOutlineUpload, HiOutlineEye } from "react-icons/hi";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Image from "next/image";

// 🔧 Deklarasi global property agar TS gak error waktu kita pakai window.signatureInput
declare global {
  interface Window {
    signatureInput?: HTMLInputElement | null;
  }
}

export default function DigitalSignaturePage() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    window.signatureInput = fileInputRef.current;
  }, []);

  const handleClear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
    setUploadedImage(null);
    setPreviewImage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setIsEmpty(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = () => {
    let dataUrl = "";
    if (uploadedImage) {
      dataUrl = uploadedImage;
    } else if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    }
    if (dataUrl) setPreviewImage(dataUrl);
  };

  const handleSave = async () => {
    const supabase = createClient();

    try {
      // 🔹 Ambil user login
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        toast.warning("Kamu harus login dulu sebelum menyimpan tanda tangan!");
        return;
      }

      // 🔹 Ambil ID dari tabel users
      const { data: userData, error: userTableError } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (userTableError || !userData) {
        toast.warning("Data pengguna tidak ditemukan di tabel users!");
        return;
      }

      const supervisorId = userData.id; // ✅ ini yang dipakai nanti

      // 🔹 Ambil data dari canvas / upload
      let dataUrl = "";
      if (uploadedImage) {
        dataUrl = uploadedImage;
      } else if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
        dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      }

      if (!dataUrl) {
        toast.warning(
          "Tanda tangan kosong! Silakan gambar atau upload terlebih dahulu."
        );
        return;
      }

      // 🔹 Convert base64 ke blob
      const blob = await (await fetch(dataUrl)).blob();

      // 🔹 Buat nama file unik
      const fileName = `signature_${supervisorId}_${Date.now()}.png`;

      // 🔹 Upload ke bucket Supabase
      const { error: uploadError } = await supabase.storage
        .from("signature")
        .upload(fileName, blob, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 🔹 Ambil public URL
      const { data: publicUrlData } = supabase.storage
        .from("signature")
        .getPublicUrl(fileName);

      const signatureUrl = publicUrlData.publicUrl;

      // 🔹 Nonaktifkan tanda tangan lama supervisor
      await supabase
        .from("signatures")
        .update({ is_active: false })
        .eq("supervisor_id", supervisorId);

      // 🔹 Simpan tanda tangan baru
      const { error: insertError } = await supabase.from("signatures").insert({
        supervisor_id: supervisorId,
        signature_url: signatureUrl,
        is_active: true,
      });

      if (insertError) throw insertError;

      toast.success("Tanda tangan berhasil disimpan!");
      handleClear();
    } catch (error: any) {
      console.error(error);
      toast.error("Gagal menyimpan tanda tangan: " + error.message);
    }
  };

  // 📂 Fungsi Drag & Drop PNG
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setIsEmpty(false);
      };
      reader.readAsDataURL(file);
    } else {
      toast.warning("Hanya file PNG yang didukung!");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (sigCanvas.current) {
        sigCanvas.current.off();
        sigCanvas.current.on();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center via-slate-50 to-indigo-100 p-4 sm:p-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className='w-full max-w-3xl'
      >
        <Card className='rounded-2xl border-gray-200 bg-white/80 backdrop-blur'>
          <CardHeader className='text-center space-y-2 pb-2'>
            <CardTitle className='text-2xl sm:text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2'>
              <LuPenLine className='text-blue-600' size={24} />
              Tanda Tangan Digital
            </CardTitle>
            <p className='text-gray-500 text-sm px-2 normal-case'>
              Buat tanda tangan kamu untuk keperluan verifikasi dokumen.
            </p>
          </CardHeader>

          <Separator />

          <CardContent className='p-4 sm:p-6 space-y-6'>
            {/* 🎨 Area Canvas / Drag-drop */}
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.01 }}
              className={`relative bg-gray-50 border-2 border-dashed rounded-2xl shadow-inner w-full aspect-[7/3] flex items-center justify-center overflow-hidden transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              {uploadedImage ? (
                <Image
                  src={uploadedImage}
                  alt='Uploaded signature'
                  className='object-contain w-full h-full'
                />
              ) : (
                <>
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor='black'
                    canvasProps={{
                      className:
                        "rounded-xl cursor-crosshair bg-white w-full h-full",
                    }}
                    onBegin={() => setIsEmpty(false)}
                  />
                  {isEmpty && (
                    <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 text-center px-2'>
                      <p className='text-gray-400 text-sm flex flex-col items-center gap-1'>
                        <LuPenLine className='text-gray-400' size={16} />
                        <span className='normal-case'>
                          Gambar tanda tangan kamu disini
                        </span>
                        <span className='text-xs text-gray-400 normal-case'>
                          (Seret atau unggah dari file)
                        </span>
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* 👁️ Tombol Preview */}
            {!isEmpty && (
              <div className='flex justify-center -mt-4 mb-2'>
                <Button
                  onClick={handlePreview}
                  variant='outline'
                  className='border-gray-400 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-300 shadow-md'
                >
                  <HiOutlineEye size={18} className='mr-2' />
                  Preview
                </Button>
              </div>
            )}

            {/* Tombol Aksi */}
            <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
              <Button
                onClick={handleClear}
                variant='outline'
                className='border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto'
              >
                <HiOutlineTrash size={18} />
                Bersihkan
              </Button>

              <Button
                type='button'
                variant='outline'
                onClick={() => window.signatureInput?.click()}
                className='border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto'
              >
                <HiOutlineUpload size={18} />
                Upload PNG
              </Button>

              <input
                ref={fileInputRef}
                type='file'
                accept='image/png'
                onChange={handleInputChange}
                className='hidden'
              />

              <Button
                onClick={handleSave}
                className='bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto'
              >
                <FiSave size={18} />
                Simpan Tanda Tangan
              </Button>
            </div>

            {/* Preview Gambar */}
            {previewImage && (
              <div className='pt-6 text-center'>
                <p className='text-sm text-gray-600 mb-2 font-medium'>
                  Preview Tanda Tangan:
                </p>
                <motion.img
                  src={previewImage}
                  alt='Preview Signature'
                  className='mx-auto border border-gray-300 rounded-lg shadow-sm bg-white max-h-40 object-contain'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            <p className='text-center text-xs text-gray-500 pt-2'>
              Pastikan tanda tangan terlihat jelas sebelum disimpan.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}