import type { Metadata } from "next";
import AdminLayoutClient from "./layout.client";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "PantauMagang",
    template: "%s | Admin Panel",
  },
  description: "Halaman role admin untuk melihat semua data anak magang dan supervisor dengan dashboard analitik, tabel informatif, upload template sertifikat, dan reset password pengguna.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
