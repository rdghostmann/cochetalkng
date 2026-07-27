import { Image } from "react-native";

export function LoginAuthBackgroundBottom() {
  return (
    <Image
      source={require("../../../../assets/images/login-bottom-background.png")}
      resizeMode="contain"
      className="absolute bottom-0 left-0 h-32 w-full"
    />
  );
}