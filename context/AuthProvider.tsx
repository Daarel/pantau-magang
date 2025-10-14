"use client";

import { createContext, type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("[Auth Change]", event);

        if (event === "SIGNED_IN") {
          setSession(session);
          setUser(session?.user ?? null);
        }

        if (event === "TOKEN_REFRESHED") {
          setSession(session);
        }

        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
          router.push("/");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  )
}
