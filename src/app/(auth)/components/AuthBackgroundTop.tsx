// src/components/auth/AuthBackgroundTop.tsx

import { Image } from "react-native";

export function AuthBackgroundTop() {
  return (
    <Image
      source={require("@/assets/images/auth/top-background.png")}
      resizeMode="cover"
      className="absolute inset-0 h-full w-full"
    />
  );
}