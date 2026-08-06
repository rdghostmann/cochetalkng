// components/auth/AuthHeader.tsx

import {
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";

export function AuthHeader() {
  return (
    <View className="relative h-56 w-full overflow-hidden">

      {/* Background Illustration */}

      <ImageBackground
        source={require("../../../../assets/images/login-top-background.png")}
        resizeMode="contain"
        className="w-full h-full object-cover object-center object-fit"
        // className="absolute inset-0 flex-1 object-cover object-center object-fit"
      >
        {/* Dark Overlay */}

        <View className="absolute inset-0 bg-black/40" />

      </ImageBackground>

      {/* Decorative Circles */}

      <View className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/15" />

      <View className="absolute -left-20 bottom-0 h-36 w-36 rounded-full bg-white/10" />

      {/* Logo & Branding */}

      <View className="flex-1 items-center justify-center px-8">

        <Image
          source={require("../../../../assets/images/icon.png")}
          resizeMode="contain"
          className="h-24 w-24"
        />

      

      </View>

    </View>
  );
}