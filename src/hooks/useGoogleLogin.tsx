// .src/hooks/useGoogleLogin.tsx
import { Alert } from "react-native";
import { useState } from "react";

import { AuthService } from "@/features/auth/services/auth.service";

export function useGoogleLogin() {
  const [loading, setLoading] = useState(false);

  async function loginWithGoogle() {
    try {
      setLoading(true);

      const { error } =
        await AuthService.signInWithGoogle();

      if (error) throw error;
    } catch (err: any) {
      Alert.alert(
        "Google Sign-In",
        err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    loginWithGoogle,
  };
}