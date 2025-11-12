"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiCircleInfo } from "react-icons/ci";
import BackButton from "@/components/BackButton";

export default function AdminUploadCertificate() {
  const supabase = createClient();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const getLatestCertificate = async () => {
      const { data, error } = await supabase.storage
        .from("certificate-template")
        .list("", {
          sortBy: { column: "created_at", order: "desc" },
          limit: 1,
        });

      if (error) {
        toast.error("Gagal mendapatkan template sertifikat terbaru");
        return;
      }

      if (!data || data.length === 0) {
        toast.warning("Template sertifikat belum ada");
        return;
      }

      const latestFile = data[0];

      if (latestFile.name === ".emptyFolderPlaceholder") {
        toast.warning("Belum ada file gambar yang valid di bucket");
        return;
      }

      const { data: signedUrlData, error: signedError } = await supabase.storage
        .from("certificate-template")
        .createSignedUrl(latestFile.name, 60);

      if (signedError) {
        toast.error("Gagal membuat signed URL");
        return;
      }

      setImageUrl(signedUrlData.signedUrl);
    };

    getLatestCertificate();

    const interval = setInterval(() => {
      getLatestCertificate();
    }, 55 * 1000);

    return () => clearInterval(interval);
  }, [supabase]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.user_metadata.role !== "admin") {
        router.push("/");
      }
    };

    getUser();
  }, [supabase, router]);

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

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-certificate", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Gagal upload");

      toast.success("Template berhasil diupload");
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      toast.error(`Gagal upload: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-row items-center justify-evenly mt-20 max-lg:flex-col max-lg:gap-8 min-h-4/5'>
      <BackButton />
      <div className='flex-1'>
        <Card className='max-w-md mx-auto'>
          <CardHeader>
            <CardTitle className='text-center'>
              Upload Template Sertifikat
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Input
              type='file'
              accept='image/*,.png,.jpg,.jpeg'
              onChange={handleFileChange}
              className='cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:font-medium file:text-blue-600 hover:file:underline'
            />

            {preview && (
              <Image
                src={preview}
                alt='Preview'
                width={400}
                height={200}
                className='w-full rounded-lg shadow mt-2'
              />
            )}

            <div className='flex flex-row items-center text-gray-500'>
              <CiCircleInfo className='inline mr-2 text-2xl' />
              <p className='text-xs normal-case max-w-[45ch]'>
                File harus kurang dari 3 MB dan hanya menerima format PNG, JPG,
                atau JPEG.
              </p>
            </div>

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className='w-full text-[#fcf400] font-normal'
            >
              {uploading ? "Mengunggah..." : "Upload Template"}
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className='flex-1 flex flex-col items-center justify-center'>
        <h1 className='font-semibold mb-7'>Template Sertifikat Terbaru</h1>
        <div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt='Template Sertifikat Terbaru'
              width={800}
              height={600}
              className='rounded-xl shadow-md object-contain p-8'
            />
          )}
        </div>
      </div>
    </div>
  );
}
