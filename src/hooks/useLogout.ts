// src/hooks/useLogout.ts

import { Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { AuthController } from "@/features/auth/controller/auth.controller";


export function useLogout() {
  const [loading, setLoading] = useState(false);

  async function logout() {
    try {
      setLoading(true);

      await AuthController.signOut();

      router.replace("/(auth)/login");
    } catch (err: any) {
      Alert.alert(
        "Logout Failed",
        err?.message ?? "Unable to sign out."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    logout,
    loading,
  };
}