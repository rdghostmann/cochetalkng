// providers/AuthNavigator.tsx

import { useEffect } from "react";
import {
  router,
  useRootNavigationState,
  useSegments,
} from "expo-router";

import { useAuthStore } from "@/store/auth.store";
import { SplashLoader } from "@/components/common/SplashLoader";


export function AuthNavigator() {
  const {
    initialized,
    loading,
    session,
  } = useAuthStore();

  const segments = useSegments();

  const navigationState =
    useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    if (!initialized || loading) return;

    const root = segments[0];

    const inAuth =
      root === "(auth)";

    const inTabs =
      root === "(tabs)";

    if (!session) {
      if (!inAuth) {
        router.replace("/(auth)/login");
      }

      return;
    }

    if (!inTabs) {
      router.replace("/(tabs)");
    }
  }, [
    initialized,
    loading,
    session,
    navigationState?.key,
    segments,
  ]);

  if (!initialized || loading) {
    return <SplashLoader />;
  }

  return null;
}