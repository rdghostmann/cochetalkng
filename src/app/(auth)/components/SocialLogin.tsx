// src/components/auth/SocialLogin.tsx

import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { AuthService } from "@/features/auth/services/auth.service";

interface SocialLoginProps {
  loading?: boolean;
}

export function SocialLogin({
  loading = false,
}: SocialLoginProps) {

  const handleGoogleLogin = async () => {
    try {
      // TODO:
      // Implement Supabase Google OAuth

      // await AuthService.signInWithGoogle();

      console.log("Google Login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      // TODO:
      // Implement Supabase Apple OAuth

      // await AuthService.signInWithApple();

      console.log("Apple Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-row gap-3">

      <Pressable
        disabled={loading}
        onPress={handleGoogleLogin}
        className="flex-row items-center justify-center rounded-2xl border border-border bg-card py-4 active:opacity-80"
      >
        <Feather
          name="chrome"
          size={20}
          color="#EA4335"
        />

        <Text className="ml-3 font-semibold text-foreground">
          Continue with Google
        </Text>

      </Pressable>

      <Pressable
        disabled={loading}
        onPress={handleAppleLogin}
        className="flex-row items-center justify-center rounded-2xl border border-border bg-card py-4 active:opacity-80"
      >
        <Feather
          name="smartphone"
          size={20}
        />

        <Text className="ml-3 font-semibold text-foreground">
          Continue with Apple
        </Text>

      </Pressable>

    </View>
  );
}