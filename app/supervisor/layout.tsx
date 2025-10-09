import type { Metadata } from "next";
import SupervisorLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Supervisor",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SupervisorLayoutClient>{children}</SupervisorLayoutClient>;
}
