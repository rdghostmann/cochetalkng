// src/providers/AuthProvider.tsx
import { PropsWithChildren, useEffect } from "react";

import { supabase } from "@/services/supabase/client";
import { AuthService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const {
    setUser,
    setSession,
    setProfile,
    setInitialized,
    setLoading,
    reset,
  } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    async function synchronizeSession() {
      try {
        setLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (!session) {
          reset();
          return;
        }

        setSession(session);

        setUser(session.user);

        const { data: profile } =
          await AuthService.getProfile(
            session.user.id
          );

        if (!mounted) return;

        setProfile(profile ?? null);
      } catch (error) {
        console.error(
          "Failed to initialize auth",
          error
        );

        reset();
      } finally {
        if (!mounted) return;

        setInitialized(true);

        setLoading(false);
      }
    }

    synchronizeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        switch (event) {
          case "INITIAL_SESSION":
            break;

          case "SIGNED_IN":
          case "TOKEN_REFRESHED":
          case "USER_UPDATED":
            if (!session) return;

            setSession(session);

            setUser(session.user);

            try {
              const { data: profile } =
                await AuthService.getProfile(
                  session.user.id
                );

              if (!mounted) return;

              setProfile(profile ?? null);
            } catch (error) {
              console.error(
                "Profile synchronization failed",
                error
              );
            }

            break;

          case "SIGNED_OUT":
            reset();
            break;
        }

        if (!mounted) return;

        setInitialized(true);

        setLoading(false);
      }
    );

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
}