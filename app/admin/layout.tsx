import type { Metadata } from "next";
import AdminLayoutClient from "./layout.client";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Panel"
};

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
