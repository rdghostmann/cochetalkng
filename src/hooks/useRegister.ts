import { AuthService } from "@/features/auth/services/auth.service";
import { RegisterFormData } from "@/features/auth/validation/auth.schema";
import { useState } from "react";


export function useRegister() {
  const [loading, setLoading] = useState(false);

  async function registerUser(data: RegisterFormData) {
    try {
      setLoading(true);

      const { error } = await AuthService.signUp(
        data.email,
        data.password
      );

      if (error) {
        throw error;
      }

      console.log("Registration successful");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    registerUser,
    loading,
  };
}