import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import RecordContent from "./components/RecordContent";
import Loading from "./loading";

async function checkAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function getUserData(userId: string | null) {
  const supabase = await createClient();

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", userId)
    .single();

  if (!userData) {
    console.warn("User belum login");
    return null;
  }
  return userData;
}

async function getSupervisorData(userId: string | null) {
  const supabase = await createClient();

  const { data: supData } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", userId)
    .single();

  if (!supData) {
    console.warn("nama supervisor tidak ada");
    return null;
  }
  return supData;
}

async function getRequestInfo(userId: string) {
  const supabase = await createClient();

  const { data: requestData } = await supabase
    .from("certificate_requests")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  
  return requestData;
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
    // console.log("File terbaru:", latestFile.name, "dibuat pada:", latestFile.created_at);

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

async function getSupervisorSignature(userId: string) {
  const supabase = await createClient();
  const { data: signatureData, error } = await supabase
    .from("signatures")
    .select("signature_url")
    .eq("supervisor_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1) 
    .single();

  if (error) {
    console.error("Error fetching supervisor signature:", error);
    return null;
  }

  return signatureData?.signature_url ?? null;
}

export default async function InternRecord() {
  const user = await checkAuth();

  if (!user) {
    redirect("/");
  }

  const userData = await getUserData(user.id);
  const templateUrl = await getCertificateTemplate();
  const requestInfo = await getRequestInfo(userData?.id);
  const signatureData = await getSupervisorSignature(userData?.supervisor_id)
  const supName = await getSupervisorData(userData?.supervisor_id)
  
  // console.log("data supName:", requestInfo)
  
  if (!userData) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-gray-600'>Tidak dapat memuat halaman</p>
        </div>
      </div>
    );
  }
  
  return (
    <Suspense fallback={Loading()}>
      <RecordContent
        userId={userData.id}
        supervisorId={userData.supervisor_id}
        supervisorName={supName?.full_name}
        userName={userData.full_name}
        start_date={userData.intern_start_date}
        end_date={userData.intern_end_date}
        department={userData.department}
        templateUrl={templateUrl}
        requestInfo={requestInfo?.is_active ?? false}
        signatureData={signatureData}
      />
    </Suspense>
  );
}
