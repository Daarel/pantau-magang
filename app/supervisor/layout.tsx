import type { Metadata } from "next";
import SupervisorLayoutClient from "./layout.client";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "PantauMagang",
    template: "%s | Supervisor Panel",
  },
  description:
    "Halaman dashboard analitik untuk memudahkan pembimbing melihat riwayat absensi, absensi setiap hari, memberikan tanda tangan untuk sertifikat anak magang yang didik.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <SupervisorLayoutClient>{children}</SupervisorLayoutClient>;
}
