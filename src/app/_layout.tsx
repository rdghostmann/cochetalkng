// src/app/_layout.tsx
import "../global.css";

import { Stack } from "expo-router";

import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { AuthNavigator } from "@/providers/AuthNavigator";
import { AuthGuard } from "./(auth)/components/AuthGuard";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AuthNavigator />
        <ThemeProvider>
          <NotificationProvider>
            <AuthGuard>
              <Stack screenOptions={{ headerShown: false }} />
            </AuthGuard>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}