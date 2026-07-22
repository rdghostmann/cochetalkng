import { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";

import { useThemeStore } from "@/store/theme.store";

export function ThemeProvider({
  children,
}: PropsWithChildren) {
  const systemTheme = useColorScheme();

  const theme = useThemeStore(
    (state) => state.theme
  );

  const resolvedTheme =
    theme === "system"
      ? systemTheme
      : theme;

  // Future:
  // NativeWind
  // React Navigation
  // Expo Router

  return children;
}