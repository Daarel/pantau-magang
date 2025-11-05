import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import RecordContent from "./components/RecordContent";
import Loading from "../loading";
import { da } from "date-fns/locale";

async function checkAuth() {
  const supabase = await createClient();
  const { data: { user }, } = await supabase.auth.getUser();
  return user;
}

async function getUserData(userId: string | null) {
  const supabase = await createClient();

  const { data: userData } = await supabase
    .from("users")
    .select("id, supervisor_id")
    .eq("auth_id", userId)
    .single();

  if (!userData) {
    console.warn("User belum login");
    return null;
  }
  return userData;

}

async function getCertificateTemplate() {
  const supabase = await createClient();

  try {
    const { data: fileList, error: listError } = await supabase.storage
      .from("certificate-template")
      .list();

    if (listError) {
      console.error("Error listing files:", listError);
      return null;
    }

    // Jika tidak ada file, return null
    if (!fileList || fileList.length === 0) {
      console.log("Tidak ada template yang ditemukan di bucket");
      return null;
    }

    // Urutkan file berdasarkan created_at (descending) untuk mendapatkan yang terbaru
    const sortedFiles = fileList.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const latestFile = sortedFiles[0];
    console.log("File terbaru:", latestFile.name, "dibuat pada:", latestFile.created_at);

    // Buat signed URL untuk file terbaru
    const { data, error } = await supabase.storage
      .from("certificate-template")
      .createSignedUrl(latestFile.name, 60 * 60); // URL berlaku 1 jam

    if (error) {
      console.error("Error creating signed URL:", error);
      return null;
    }

    return data.signedUrl;

  } catch (error) {
    console.error("Error in getCertificateTemplate:", error);
    return null;
  }
}

export default async function InternRecord() {
  const user = await checkAuth();

  if(!user){
    redirect("/");
  }

  const userData = await getUserData(user.id);
  const templateUrl = await getCertificateTemplate();
  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Tidak dapat memuat halaman</p>
        </div>
      </div>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <RecordContent 
        userId={userData.id}
        supervisorId={userData.supervisor_id}
        templateUrl={templateUrl}
      />
    </Suspense>
  )
}
