"use client";

import { ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import SupervisorLayout from "@/app/supervisor/layout.client";
import InternLayout from "@/app/intern/layout.client";
import AdminLayout from "@/app/admin/layout.client";

export default function RoleBasedLayout({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function getRole() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setRole(user.user_metadata.role); // role harus disimpan di user_metadata
      }
    }
    getRole();
  }, []);

  if (!role) {
    return <div className='text-sm'>Loading</div>;
  }

  if (role === "supervisor") {
    return <SupervisorLayout>{children}</SupervisorLayout>;
  }
  if (role === "intern") {
    return <InternLayout>{children}</InternLayout>;
  }
  if (role === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // fallback
  return <div>Akses tidak dikenali</div>;
}
