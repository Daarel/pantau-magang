"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RealtimeDashboardRefresher() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("realtime-dashboard")
      // 🟢 listen semua event dari tabel attendance
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "attendance" },
        () => router.refresh()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "attendance_schedules" },
        () => router.refresh()
      )
      // 🟣 listen semua event dari tabel user
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => router.refresh()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null; // komponen ini tidak menampilkan apa pun
}
