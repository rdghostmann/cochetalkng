import { AuthService } from "@/features/auth/services/auth.service";
import { LoginFormData } from "@/features/auth/validation/auth.schema";
import { useState } from "react";



export function useLogin() {
  const [loading, setLoading] = useState(false);

  async function login(data: LoginFormData) {
    try {
      setLoading(true);

      const { error } = await AuthService.signIn(
        data.email,
        data.password
      );

      if (error) {
        throw error;
      }

      console.log("Login successful");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
  };
}