// src/providers/AuthProvider.tsx
import { PropsWithChildren, useEffect } from "react";

import { supabase } from "@/services/supabase/client";
import { useAuthStore } from "@/store/auth.store";

export function AuthProvider({ children }: PropsWithChildren) {
  const {
    setUser,
    setSession,
    setInitialized,
    setLoading,
    reset,
  } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      setInitialized(true);
      setLoading(false);
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        reset();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return children;
}