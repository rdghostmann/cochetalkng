// src/hooks/useLogin.ts

import { Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { LoginFormData } from "@/features/auth/validation/auth.schema";
import { AuthController } from "@/features/auth/controller/auth.controller";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  async function login(
    data: LoginFormData
  ) {
    try {
      setLoading(true);

      await AuthController.signIn(
        data.email,
        data.password
      );

      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        err?.message ?? "Unable to sign in."
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