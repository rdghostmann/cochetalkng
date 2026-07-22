import "../global.css";

import { Stack } from "expo-router";


import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { QueryProvider } from "@/providers/QueryProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryProvider>
    </ThemeProvider>
  );
}
