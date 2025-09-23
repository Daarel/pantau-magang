// app/profile/layout.tsx
import RoleBasedLayout from "@/components/RoleBasedLayout";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleBasedLayout>{children}</RoleBasedLayout>;
}
