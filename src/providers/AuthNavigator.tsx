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

    const root = segments[0];

    const isAuth = root === "(auth)";
    const isTabs = root === "(tabs)";
    // Guest
    if (!session) {
      if (!isAuth) {
        router.replace("/(auth)/login");
      }

      return;
    }

    // Logged in but email not verified
    if (!user?.email_confirmed_at) {
      if (segments[1] !== "verify-email") {
        router.replace("/(auth)/verify-email");
      }

      return;
    }

    // Logged in
    if (!isTabs) {
      router.replace("/(tabs)");
    }
  }, [
    initialized,
    loading,
    session,
    user,
    navigationState?.key,
    segments,
  ]);

  return null;
}