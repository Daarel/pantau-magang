import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import RecordContent from "./components/RecordContent";
import Loading from "../loading";

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
    .select("id, supervisor_id")
    .eq("auth_id", userId)
    .single();

  if (!userData) {
    console.warn("User belum login");
    return null;
  }
  return userData;
}

// async function getCertificate(userId: string) {
//   const supabase = await createClient();
//   console.log("Authenticated user:", userId);

//   try {
//     const { data: sertificateData, error: listError } = await supabase.storage
//       .from("certificate-template")
//       .list(userId, {
//         limit: 1,
//         sortBy: { column: "created_at", order: "desc" },
//       });

//     if (listError) {
//       console.error("Gagal mengambil file:", listError);
//       return null;
//     }

//     if (!sertificateData || sertificateData.length === 0) {
//       console.warn("Tidak ada file untuk user", userId);
//       return null;
//     }

//     // Ambil file terbaru
//     const latestFile = sertificateData[0];
//     console.log("Latest file found:", latestFile.name);

//     // Buat URL public
//     const { data: signedUrlData, error: signedUrlError } = await supabase.storage
//       .from("certificate-template")
//       .createSignedUrl(`${userId}/${latestFile.name}`, 60 * 60);

//     if (signedUrlError) {
//       console.error("Gagal membuat signed URL:", signedUrlError);
//       return null;
//     }
//     console.log("Signed URL created successfully");
//     return signedUrlData.signedUrl;

//   } catch (error) {
//     console.error("Unexpected error in getCertificate:", error);
//     return null;
//   }
// }

export default async function InternRecord() {
  const user = await checkAuth();
  console.log(user);

  if (!user) {
    redirect("/");
  }

  const userData = await getUserData(user.id);
  // console.log("internData berdasarkan ID user:", internData)

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
      />
    </Suspense>
  );
}
