import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function InternProfilePage() {
  const supabase = await createClient();

  // cek user login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // ambil supervisor id dari users table
  const { data: supervisorData, error: supervisorError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (supervisorError || !supervisorData) {
    console.error("Error fetching supervisor data:", supervisorError);
    redirect("/");
  }

  // ambil daftar interns yg diampu oleh supervisor ini
  const { data: interns, error: internsError } = await supabase
    .from("users")
    .select("id, full_name, nomor_induk, institution, role")
    .eq("role", "intern")
    .eq("supervisor_id", supervisorData.id);

  if (internsError) {
    console.error("Error fetching interns:", internsError);
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="h4 font-semibold">Daftar Intern Anda</h1>
          <p className="text-gray-500">
                Profile peserta magang
          </p>
        </div>
      </div>

      {(!interns || interns.length === 0) && (
        <p className="text-gray-600">Belum ada intern yang terdaftar.</p>
      )}

      <div className="grid gap-4">
        {interns?.map((intern) => (
          <Card key={intern.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="font-semibold">{intern.full_name}</p>
                <p className="text-sm text-gray-600">{intern.nomor_induk}</p>
                <p className="text-sm text-gray-500">
                  {intern.institution || "Tidak ada institusi"}
                </p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {intern.role}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
