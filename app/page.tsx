"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";
import { useEffect, useState } from "react";

type UserRole = "intern" | "supervisor" | "admin";

export interface User {
  role: UserRole;
}

export default function LoginPage() {
  const router = useRouter();
  const [redirectRole, setRedirectRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (redirectRole) {
      router.push(`/${redirectRole}/dashboard`);
    }
  }, [redirectRole, router]);

  const handleLogin = (user: User) => {

    setRedirectRole(user.role);
  };
  return (
    <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <LoginForm onLogin={handleLogin} />
    </main>
  );
}
