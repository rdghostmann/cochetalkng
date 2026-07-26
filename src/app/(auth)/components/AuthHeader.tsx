// AuthHeader.tsx
import { Image, Text, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <View className="items-center mb-10">

      <Image
        source={require("../../../../assets/images/icon.png")}
        className="h-24 w-24 rounded-3xl"
        resizeMode="contain"
      />

      <Text className="mt-6 text-3xl font-bold text-center text-foreground">
        {title}
      </Text>

      <Text className="mt-2 text-center text-base text-muted-foreground px-6">
        {subtitle}
      </Text>

    </View>
  );
}