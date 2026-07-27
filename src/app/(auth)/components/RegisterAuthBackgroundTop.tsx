// (auth)/components/RegisterAuthBackgroundTop.tsx

import { Image } from "react-native";

export function RegisterAuthBackgroundTop() {
  return (
    <Image
      source={require("../../../../assets/images/register-top-background.png")}
      resizeMode="cover"
      className="absolute inset-0 h-full w-full"
    />
  );
}