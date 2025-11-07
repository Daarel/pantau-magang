"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  FaUniversity,
  FaRegCalendarAlt,
  FaIdBadge,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

export default function AnimatedInternList({ interns }: { interns: any[] }) {
  const [visibleInterns, setVisibleInterns] = useState(interns);
  const supabase = createClient();

  // Fungsi hitung sisa hari kerja
  const calculateRemainingWeekdays = (end: string | null) => {
    if (!end) return null;
    const today = new Date();
    const endDate = new Date(end);
    let count = 0;
    const current = new Date(today);
    while (current <= endDate) {
      count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  // 🔹 Efek untuk ubah status & auto-hide intern yang sudah selesai
  useEffect(() => {
    const updateStatuses = async () => {
      const today = new Date();

      const updatedInterns = await Promise.all(
        visibleInterns.map(async (intern) => {
          const endDate = new Date(intern.intern_end_date);
          const diffDays = Math.floor(
            (today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          // Kalau belum selesai magang
          if (today < endDate) return intern;

          // Kalau baru selesai dan belum update status ke Nonaktif
          if (
            today >= endDate &&
            diffDays === 0 &&
            intern.status !== "Nonaktif"
          ) {
            const { error } = await supabase
              .from("users")
              .update({ status: "Nonaktif" })
              .eq("id", intern.id);

            if (error) console.error("❌ Gagal update status:", error);
            else console.log(`✅ ${intern.full_name} diupdate ke Nonaktif`);

            return { ...intern, status: "Nonaktif", _hideAfter: 3 };
          }

          // Kalau sudah lewat 3 hari dari tanggal selesai → sembunyikan
          if (diffDays > 3) return null;

          return intern;
        })
      );

      // Filter intern yang masih harus tampil
      setVisibleInterns(updatedInterns.filter(Boolean));
    };

    updateStatuses();

    // Cek setiap hari (24 jam sekali)
    const interval = setInterval(updateStatuses, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {visibleInterns.map((intern, i) => {
        const daysRemaining = calculateRemainingWeekdays(
          intern.intern_end_date
        );

        return (
          <motion.div
            key={intern.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card
              className={`relative rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ${
                daysRemaining === 0 ? "bg-red-50" : "bg-white"
              }`}
            >
              {/* 🔹 Badge Status */}
              <div
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  intern.status?.toLowerCase().trim() === "aktif"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {intern.status || "Tidak Aktif"}
              </div>

              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* 🔹 Kiri: Foto + Info */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-blue-100 text-blue-700 font-semibold ring-2 ring-gray-200 shrink-0">
                    {intern.photo_url ? (
                      <Image
                        width={48}
                        height={48}
                        src={intern.photo_url}
                        alt={intern.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{intern.full_name?.charAt(0) || "?"}</span>
                    )}
                  </div>

                  {/* Info dasar */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-800">
                      {intern.full_name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaIdBadge className="text-gray-400" />{" "}
                      {intern.nomor_induk}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaUniversity className="text-gray-400" />{" "}
                      {intern.institution || "Tidak ada institusi"}
                    </p>
                  </div>
                </div>

                {/* 🔹 Kanan: Periode & Sisa Hari */}
                <div className="text-left sm:text-right space-y-1">
                  <p className="text-xs text-gray-500 flex items-center gap-1 sm:justify-end">
                    <FaRegCalendarAlt className="text-gray-400" />
                    {intern.intern_start_date
                      ? new Date(intern.intern_start_date).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "short", year: "numeric" }
                        )
                      : "?"}{" "}
                    -{" "}
                    {intern.intern_end_date
                      ? new Date(intern.intern_end_date).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "short", year: "numeric" }
                        )
                      : "?"}
                  </p>

                  {daysRemaining !== null && (
                    <p
                      className={`text-sm font-medium flex items-center gap-1 sm:justify-end ${
                        daysRemaining === 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {daysRemaining === 0 ? (
                        <>
                          <FaCheckCircle className="text-red-600" /> Selesai
                        </>
                      ) : (
                        <>
                          <FaHourglassHalf className="text-green-600" />{" "}
                          {daysRemaining} hari lagi
                        </>
                      )}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
