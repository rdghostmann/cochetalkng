// src/app/_layout.tsx
import "../global.css";

import { Stack } from "expo-router";

import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { AuthNavigator } from "@/providers/AuthNavigator";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AuthNavigator/>
        <ThemeProvider>
          <NotificationProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}