"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button"; // 🔹 tombol edit & hapus
import { MdEdit, MdDelete } from "react-icons/md";

export default function Profile() {
  const [role, setRole] = useState<"intern" | "supervisor" | "admin" | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const fallbackAvatar = "/avatar_fallback.png";
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const supabase = createClient();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("users")
        .select("id, full_name, nomor_induk, department, role, photo_url, institution, intern_start_date, intern_end_date")
        .eq("email_auth", session.user.id)
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

  // 📌 Fungsi upload avatar
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const supabase = createClient();
  const file = event.target.files?.[0];
  if (!file) return;

  // 🔹 Cek ukuran file (max 2MB)
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  if (file.size > MAX_SIZE) {
    console.error("Gagal upload: ukuran file melebihi 2MB");
    alert("Ukuran foto maksimal 2MB. Silakan pilih file lain.");
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return;

  // 🔹 Hapus foto lama kalau ada
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

  // 🔹 Generate nama unik
  const uniqueSuffix = `${Date.now()}-${crypto.randomUUID()}`;
  const ext = file.name.split(".").pop();
  const fileName = `${session.user.id}-${uniqueSuffix}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (uploadError) {
    console.error("Gagal upload:", uploadError);
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
    return;
  }

  setProfileData((prev: any) => ({
    ...prev,
    photo_url: `${publicUrl}?t=${Date.now()}`
  }));
  // ✅ Trigger event supaya navbar ikut refresh
  window.dispatchEvent(new Event("profile-updated"));
};
  // 📌 Fungsi hapus avatar
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
      photo_url: null
    }));
    // ✅ Trigger event supaya navbar ikut refresh
    window.dispatchEvent(new Event("profile-updated"));
  };

  return (
    <>
      <h1 className="title_header text-black">Profil</h1>
      <p className="text-gray-500">Informasi tentang saya</p>
      <div className="flex justify-center items-center flex-col">
        <Card>
          <CardContent className="flex flex-col justify-center items-center">
            <div className="relative">
              <Image
                src={avatarUrl}
                width={300}
                height={300}
                alt="foto profil Anda"
                className="rounded-full object-cover"
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <MdEdit/>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  <MdDelete/>
                </Button>
              </div>
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
                      <p>Periode Magang: </p>
                    </>
                  )}
                  {(role === "supervisor" || role === "admin") && <p>Gedung: </p>}
                </li>
              </ul>
              <ul>
                <li>
                  <p>{profileData.full_name}</p>
                  <p>{profileData.nomor_induk}</p>
                  {role === "intern" && (
                    <>
                      <p>{profileData.institution}</p>
                      <p>
                        {new Date(profileData.intern_start_date).toDateString()} -{" "}
                        {new Date(profileData.intern_end_date).toDateString()}
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
