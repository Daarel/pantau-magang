import type { Metadata } from "next";
import SupervisorLayoutClient from "./layout.client";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Supervisor",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <SupervisorLayoutClient>{children}</SupervisorLayoutClient>;
}
