"use client";

import { useState } from "react";
import Papa from "papaparse";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner"
import { Download, } from "lucide-react";

const supabase = createClient();

export default function ExportAttendanceButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      toast.error('User not authenticated');
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("auth_id", user.id)
      .single();
    
    console.log("Fetched data:", userData);

    if (userError) {
      console.error("Error fetching data:", userError.message);
      setLoading(false);
      return;
    }

    const { data: userAttendance, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userData.id);

    if (!userAttendance || userAttendance.length === 0) {
      toast.error('No data found');
      console.warn("No data found");
      setLoading(false);
      return;
    }

    // 2. Convert ke CSV
    const csv = Papa.unparse(userAttendance as Record<string, any>[]);

    // 3. Buat file blob untuk di-download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 4. Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoading(false);
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 text-[12px] md:text-[16px] cursor-pointer'
    >
      <Download size={18} />
      {loading ? "Exporting..." : "Export CSV"}
    </button>
  );
}
