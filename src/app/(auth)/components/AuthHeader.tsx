// AuthHeader.tsx
import { Image, Text, View } from "react-native";

import { AuthBackgroundTop } from "./AuthBackgroundTop";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AuthHeader({
  title = "CocheTalkNG",
  subtitle = "Nigeria's Automotive Community",
}: AuthHeaderProps) {
  return (
    <View
      className="
        relative
        h-[285px]
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* Background Illustration */}
      <AuthBackgroundTop />

      {/* Logo */}
      <Image
        source={require("@/assets/images/logo.png")}
        resizeMode="contain"
        className="h-24 w-24"
      />

      {/* Brand */}
      <Text
        className="
          mt-3
          text-[28px]
          font-extrabold
          tracking-tight
          text-foreground
        "
      >
        CocheTalk
        <Text className="text-primary">NG</Text>
      </Text>

      {/* Subtitle */}
      <Text
        className="
          mt-1
          text-[15px]
          font-medium
          text-muted-foreground
        "
      >
        {subtitle}
      </Text>
    </View>
  );
}