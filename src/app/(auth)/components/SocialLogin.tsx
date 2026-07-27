// src/components/auth/SocialLogin.tsx

import { Feather, FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface SocialButtonsProps {
  loading?: boolean;

  onGooglePress?(): void;

  onApplePress?(): void;
}

export function SocialButtons({
  loading = false,
  onGooglePress,
  onApplePress,
}: SocialButtonsProps) {
  return (
    <View className="mt-6 flex-row justify-between gap-4">
      {/* Google */}

      <Pressable
        disabled={loading}
        onPress={onGooglePress}
        className="
          h-14
          flex-1
          flex-row
          items-center
          justify-center
          rounded-2xl
          border
          border-border
          bg-white
          active:opacity-80
        "
      >
        <Feather
          name="chrome"
          size={20}
          color="#EA4335"
        />

        <Text className="ml-3 text-[15px] font-semibold text-foreground">
          Google
        </Text>
      </Pressable>

      {/* Apple */}

      <Pressable
        disabled={loading}
        onPress={onApplePress}
        className="
          h-14
          flex-1
          flex-row
          items-center
          justify-center
          rounded-2xl
          border
          border-border
          bg-white
          active:opacity-80
        "
      >
        <FontAwesome
          name="apple"
          size={22}
          color="#111827"
        />

        <Text className="ml-3 text-[15px] font-semibold text-foreground">
          Apple
        </Text>
      </Pressable>
    </View>
  );
}