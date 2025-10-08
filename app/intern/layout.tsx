import type { Metadata } from "next";
import InternLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: {
    default: "Absensi",
    template: "%s | PantauMagang",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <InternLayoutClient>{children}</InternLayoutClient>;
}