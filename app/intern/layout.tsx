import type { Metadata } from "next";
import InternLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Absensi"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <InternLayoutClient>{children}</InternLayoutClient>;
}