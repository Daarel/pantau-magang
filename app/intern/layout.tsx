import type { Metadata } from "next";
import InternLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: {
    default: "PantauMagang",
    template: "%s | Absensi",
  },
  description: "Halaman untuk anak magang melakukan absensi dan melihat riwayat absensi selama magang.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <InternLayoutClient>{children}</InternLayoutClient>;
}