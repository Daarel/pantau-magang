"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { compressImage, processImage } from "@/lib/utils";
import Link from "next/link";

export default function Profile() {
  const [role, setRole] = useState<"intern" | "supervisor" | "admin" | null>(
    null
  );
  const [profileData, setProfileData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fallbackAvatar = "/avatar_fallback.png";
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("users")
        .select(
          "id, full_name, nomor_induk, department, role, photo_url, institution, intern_start_date, intern_end_date, supervisor:supervisor_id ( full_name )"
        )
        .eq("auth_id", session.user.id)
        .single();

      if (error) {
        console.error("Gagal ambil data user:", error);
        return;
      }

      setRole(data.role);
      setProfileData(data);
    };

    getUserProfile();
  }, []);

  if (!role || !profileData) return <p>Loading...</p>;

  const avatarUrl = profileData.photo_url
    ? `${profileData.photo_url}?t=${Date.now()}`
    : fallbackAvatar;

  // 📌 Upload avatar
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const supabase = createClient();
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // 🔹 Gunakan processImage() untuk auto-kompres gambar di atas 3MB
    let finalFile = file;
    const MAX_COMPRESS_SIZE_MB = 3; // batas 3 MB
    if (file.size > MAX_COMPRESS_SIZE_MB * 1024 * 1024) {
      try {
        finalFile = await processImage(file, MAX_COMPRESS_SIZE_MB);
        console.log(
          `✅ Gambar berhasil dikompres dari ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB → ${(finalFile.size / 1024 / 1024).toFixed(2)}MB`
        );
      } catch (err) {
        console.error("❌ Gagal mengkompres gambar:", err);
        alert("Gagal mengkompres gambar, silakan coba ulang.");
        setIsUploading(false);
        return;
      }
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      setIsUploading(false);
      return;
    }

    if (profileData.photo_url) {
      try {
        const oldPath = profileData.photo_url.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("avatars").remove([oldPath]);
        }
      } catch (err) {
        console.warn("Gagal hapus foto lama:", err);
      }
    }

    const uniqueSuffix = `${Date.now()}-${crypto.randomUUID()}`;
    const ext = finalFile.name.split(".").pop();
    const fileName = `${session.user.id}-${uniqueSuffix}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, finalFile); // 🔹 upload file hasil kompresi (finalFile)

    if (uploadError) {
      console.error("Gagal upload:", uploadError);
      setIsUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from("users")
      .update({ photo_url: publicUrl })
      .eq("id", profileData.id);

    if (updateError) {
      console.error("Gagal update avatar:", updateError);
      setIsUploading(false);
      return;
    }

    setProfileData((prev: any) => ({
      ...prev,
      photo_url: `${publicUrl}?t=${Date.now()}`,
    }));
    window.dispatchEvent(new Event("profile-updated"));
    setIsUploading(false);
  };

  // 📌 Hapus avatar
  const handleDelete = async () => {
    const supabase = createClient();

    if (profileData.photo_url) {
      try {
        const oldPath = profileData.photo_url.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("avatars").remove([oldPath]);
        }
      } catch (err) {
        console.warn("Gagal hapus foto lama:", err);
      }
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ photo_url: null })
      .eq("id", profileData.id);

    if (updateError) {
      console.error("Gagal hapus avatar di database:", updateError);
      return;
    }

    setProfileData((prev: any) => ({
      ...prev,
      photo_url: null,
    }));
    window.dispatchEvent(new Event("profile-updated"));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Link
          href={
            role === "intern"
              ? "/intern/dashboard"
              : role === "supervisor"
              ? "/supervisor/dashboard"
              : "/admin/dashboard"
          }
          className="px-2 py-2 hover:bg-gray-200 rounded-full transition"
        >
          <IoArrowBackOutline className="text-2xl text-gray-700 hover:text-gray-900" />
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <h1 className="h4 font-semibold">Profile</h1>
          <p className="text-gray-500">Informasi tentang saya</p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-10">
        <Card>
          <CardContent className="flex flex-col justify-center items-center">
            <div className="relative w-[300px] h-[300px]">
              {/* Foto profil */}
              <div className="w-full h-full rounded-full overflow-hidden relative z-0">
                {isUploading ? (
                  <div className="flex flex-col justify-center items-center gap-2 border-dashed border-black/30 border-2 h-full w-full rounded-full bg-gray-200">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="text-center text-sm">
                      Mengkompresi gambar...
                    </p>
                  </div>
                ) : (
                  <Image
                    src={avatarUrl}
                    fill
                    alt="foto profil Anda"
                    className="object-cover z-0"
                  />
                )}
              </div>

              {/* Tombol Edit & Hapus di atas foto */}
              {!isUploading && (
                <div className="absolute bottom-3 right-3 flex gap-2 z-50">
                  <div className= "rounded-full flex p-1 bg-white/70 hover:bg-white/90 shadow-md gap-2">
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <MdEdit />
                    </Button>
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleUpload}
            />

            <div className="flex flex-row mt-5 gap-10">
              <ul className="flex flex-col items-start">
                <li>
                  <p>Nama Lengkap: </p>
                  <p>Nomor Induk: </p>
                  {role === "intern" && (
                    <>
                      <p>Universitas: </p>
                      <p>Pembimbing: </p>
                      <p>Periode Magang: </p>
                    </>
                  )}
                  {(role === "supervisor" || role === "admin") && (
                    <p>Gedung: </p>
                  )}
                </li>
              </ul>

              <ul>
                <li>
                  <p>{profileData.full_name}</p>
                  <p>{profileData.nomor_induk}</p>
                  {role === "intern" && (
                    <>
                      <p>{profileData.institution}</p>
                      <p>{profileData.supervisor?.full_name ?? "-"}</p>
                      <p>
                        {new Date(profileData.intern_start_date).toDateString()}{" "}
                        - {new Date(profileData.intern_end_date).toDateString()}
                      </p>
                    </>
                  )}
                  {(role === "supervisor" || role === "admin") && (
                    <p>{profileData.department}</p>
                  )}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
