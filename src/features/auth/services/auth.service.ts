// src/features/auth/services/auth.service.ts
import { supabase } from "@/services/supabase/client";

export const AuthService = {
  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signUp(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
    });
  },

  signOut() {
    return supabase.auth.signOut();
  },

  resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  },

  getSession() {
    return supabase.auth.getSession();
  },

  getUser() {
    return supabase.auth.getUser();
  },
};