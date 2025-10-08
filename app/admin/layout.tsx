import type { Metadata } from "next";
import AdminLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: "%s | PantauMagang",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
