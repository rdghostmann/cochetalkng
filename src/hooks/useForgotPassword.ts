import { AuthService } from "@/features/auth/services/auth.service";
import { useState } from "react";


export function useForgotPassword() {
  const [loading, setLoading] = useState(false);

  async function resetPassword(email: string) {
    try {
      setLoading(true);

      const { error } =
        await AuthService.resetPassword(email);

      if (error) {
        throw error;
      }

      console.log("Password reset email sent");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    resetPassword,
    loading,
  };
}