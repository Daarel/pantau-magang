"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default function AdminUploadCertificate() {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Pilih file dulu ya");
      return;
    }

    try {
      setUploading(true);

      const { data, error } = await supabase.storage
        .from("certificate-template")
        .upload("template.png", file, { upsert: true });

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("certificate-template")
        .getPublicUrl("template.png");

      setUploadedUrl(publicData.publicUrl);
      toast.success("Template berhasil diupload 🎉");
    } catch (err: any) {
      toast.error(`Gagal upload: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between mb-6'>
      <Link
        href='/admin/dashboard'
        className='absolute left-16 top-16 px-2 py-2 hover:bg-gray-200 rounded-full transition'
      >
        <IoArrowBackOutline className='text-2xl text-gray-700 hover:text-gray-900' />
      </Link>

        <div className='absolute left-1/2 -translate-x-1/2 text-center'>
          <h1 className='h4 font-semibold'>Profile</h1>
          <p className='text-gray-500'>Informasi tentang saya</p>
        </div>
      </div>
      <div className='container mx-auto p-8'>
        <Card className='max-w-md mx-auto'>
          <CardHeader>
            <CardTitle>Upload Template Sertifikat</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Input
              type='file'
              accept='image/*,.pdf'
              onChange={handleFileChange}
            />

            {preview && (
              <Image
                src={preview}
                alt='Preview'
                className='w-full rounded-lg shadow mt-2'
              />
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading}
              className='w-full'
            >
              {uploading ? "Mengunggah..." : "Upload Template"}
            </Button>

            {uploadedUrl && (
              <div className='mt-4 text-center'>
                <p className='text-sm text-gray-500'>File berhasil diupload:</p>
                <a
                  href={uploadedUrl}
                  target='_blank'
                  className='text-blue-600 underline'
                >
                  Lihat di Supabase Storage
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
