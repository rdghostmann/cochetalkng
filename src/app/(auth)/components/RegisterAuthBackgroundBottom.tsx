// (auth)/components/RegisterAuthBackgroundBottom.tsx
import { Image } from "react-native";

export function RegisterAuthBackgroundBottom() {
  return (
    <Image
      source={require("../../../../assets/images/register-bottom-background.png")}
      resizeMode="contain"
      className="absolute bottom-0 left-0 h-32 w-full"
    />
  );
}