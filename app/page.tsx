'use client';

import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";
import AdminDashboard from "@/app/admin/attendance/page";

type UserRole = "intern" | "supervisor" | "admin";

export interface User {
  role: UserRole
}

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (user: User) => {
    // Arahkan ke halaman dashboard sesuai role
    switch (user.role) {
      case "intern":
        router.push("/intern/dashboard");
        break;
      case "supervisor":
        router.push("/supervisor/dashboard");
        break;
      case "admin":
        router.push("/admin/dashboard");
        break;
      default:
        router.push("/intern/dashboard");
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* <LoginForm onLogin={handleLogin} /> */}
      <AdminDashboard />
    </main>
  );
}