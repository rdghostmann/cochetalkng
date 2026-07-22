// src/hooks/useRegister.ts
import { useState } from "react";

import { AuthService } from "@/features/auth/services/auth.service";
import { RegisterFormData } from "@/features/auth/validation/auth.schema";

export function useRegister() {

  const [loading, setLoading] = useState(false);

  async function registerUser(
    data: RegisterFormData
  ) {
    try {
      setLoading(true);

      const { data: authData, error } =
        await AuthService.signUp(
          data.email,
          data.password,
          data.fullName
        );

      if (error) throw error;

      const user = authData.user;

      if (!user) {
        throw new Error(
          "Unable to create account."
        );
      }

      await AuthService.createProfile({
        id: user.id,
        email: data.email,
        full_name: data.fullName,
      });

    } catch (error: any) {
      console.log(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    registerUser,
    loading,
  };
}