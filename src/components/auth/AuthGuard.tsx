import { Redirect } from "expo-router";

import { useAuthStore } from "@/store/auth.store";

export function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initialized, session } = useAuthStore();

  if (!initialized) return null;

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
}