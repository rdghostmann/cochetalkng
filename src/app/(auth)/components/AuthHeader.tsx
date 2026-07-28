// AuthHeader.tsx
import { Image, Text, View } from "react-native";

import { LoginAuthBackgroundTop } from "./LoginAuthBackgroundTop";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AuthHeader({
  title = "",
  subtitle = "Learn • Connect • Fix",
}: AuthHeaderProps) {
  return (
    <View
      className="
        relative
        h-1/6
        items-center
        justify-center
        overflow-hidden
        border
z-20
      "
    >
      {/* Background Illustration */}
      {/* <LoginAuthBackgroundTop /> */}

      {/* Logo */}
      <View className="mt-10 h-24 w-24 overflow-hidden ">
        <Image
          source={require("../../../../assets/images/icon.png")}
          resizeMode="cover"
          className="w-full "
        />
      </View>

      {/* Brand */}
      {/* <Text
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
      </Text> */}

      {/* Subtitle */}
      {/* <Text
        className="
          mt-1
          text-[15px]
          font-medium
          text-muted-foreground
        "
      >
        {subtitle}
      </Text> */}
    </View>
  );
}