// src/components/auth/AuthBackgroundTop.tsx

import { Image, View } from "react-native";

export function LoginAuthBackgroundTop() {
  return (
    <View className="absolute inset-0 flex-1 h-1/3">
      <Image
        source={require("../../../../assets/images/login-top-background.png")}
        resizeMode="contain"
        className="h-full w-full"
      />

    </View>
  );
}