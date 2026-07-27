

import {
  ActivityIndicator,
  Image,
  View,
} from "react-native";

export function SplashLoader() {
  return (
    <View className="flex-1 items-center justify-center bg-background">

      <Image
        source={require("../../../assets/images/icon.png")}
        resizeMode="contain"
        style={{
          width: 120,
          height: 120,
        }}
      />

      <ActivityIndicator
        size="small"
        color="#00C787"
        style={{
          marginTop: 24,
        }}
      />

    </View>
  );
}