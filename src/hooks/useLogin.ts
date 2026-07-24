// .src/hooks/useLogin.ts
import { Alert } from "react-native";
import { useState } from "react";

import { AuthService } from "@/features/auth/services/auth.service";
import { LoginFormData } from "@/features/auth/validation/auth.schema";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  async function login(
    data: LoginFormData
  ) {
    try {
      setLoading(true);

      const {
        data: result,
        error,
      } = await AuthService.signIn(
        data.email,
        data.password
      );

      if (error) throw error;

      if (!result.user?.email_confirmed_at) {
        Alert.alert(
          "Verify Email",
          "Please verify your email before logging in."
        );

        return;
      }
    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
  };
}