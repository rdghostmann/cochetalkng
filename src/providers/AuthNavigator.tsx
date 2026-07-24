// .src/providers/AuthNavigator.tsx
import { useEffect } from "react";
import {
  router,
  useRootNavigationState,
  useSegments,
} from "expo-router";

import { useAuthStore } from "@/store/auth.store";

export function AuthNavigator() {
  const {
    initialized,
    loading,
    session,
    user,
  } = useAuthStore();

  const segments = useSegments();

  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    if (!initialized || loading) return;

    const inAuthGroup =
      segments[0] === "(auth)";

    const inProtectedGroup =
      segments[0] === "(protected)";

    const emailVerified =
      !!user?.email_confirmed_at;

    /**
     * -----------------------------
     * Guest User
     * -----------------------------
     */

    if (!session) {
      if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }

      return;
    }

    /**
     * -----------------------------
     * Logged in but Email NOT verified
     * -----------------------------
     */

    if (!emailVerified) {
      if (
        segments[1] !== "verify-email"
      ) {
        router.replace(
          "/(auth)/verify-email"
        );
      }

      return;
    }

    /**
     * -----------------------------
     * Logged in & Verified
     * -----------------------------
     */

    if (
      inAuthGroup ||
      !inProtectedGroup
    ) {
      router.replace("/(protected)/marketplace");
    }
  }, [
    navigationState?.key,
    initialized,
    loading,
    session,
    user,
    segments,
  ]);

  return null;
}