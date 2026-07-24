// src/hooks/useRegister.ts

import { Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { RegisterFormData } from "@/features/auth/validation/auth.schema";
import { AuthController } from "@/features/auth/controller/auth.controller";

export function useRegister() {
  const [loading, setLoading] = useState(false);

  async function registerUser(
    data: RegisterFormData
  ) {
    try {
      setLoading(true);

      await AuthController.signUp(
        data.fullName,
        data.email,
        data.password
      );

      Alert.alert(
        "Account Created",
        "Your account has been created successfully."
      );

      router.replace("/(auth)/login");
    } catch (err: any) {
      Alert.alert(
        "Registration Failed",
        err?.message ?? "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    registerUser,
  };
}