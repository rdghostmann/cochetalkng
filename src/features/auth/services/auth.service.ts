// src/features/auth/services/auth.service.ts
import { makeRedirectUri } from "expo-auth-session";

import { supabase } from "@/services/supabase/client";

export const AuthService = {
  /**
   * Email & Password Login
   */
  async signIn(
    email: string,
    password: string
  ) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  /**
   * Register
   */
  async signUp(
    email: string,
    password: string,
    fullName: string
  ) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
  },

  /**
   * Google OAuth
   */
  async signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: "google",

      options: {
        redirectTo: makeRedirectUri(),

        skipBrowserRedirect: false,
      },
    });
  },

  /**
   * Create Profile
   */
  async createProfile(profile: {
    id: string;
    email: string;
    full_name: string;
  }) {
    return supabase
      .from("profiles")
      .upsert(profile)
      .select()
      .single();
  },

  /**
   * Get Profile
   */
  async getProfile(id: string) {
    return supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
  },

  /**
   * Update Profile
   */
  async updateProfile(
    id: string,
    values: Record<string, unknown>
  ) {
    return supabase
      .from("profiles")
      .update(values)
      .eq("id", id)
      .select()
      .single();
  },

  /**
   * Password Reset
   */
  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(
      email
    );
  },

  /**
   * Logout
   */
  async signOut() {
    return supabase.auth.signOut();
  },

  /**
   * Current Session
   */
  async getSession() {
    return supabase.auth.getSession();
  },

  /**
   * Current User
   */
  async getUser() {
    return supabase.auth.getUser();
  },

  /**
   * Resend Email Verification
   */
  async resendVerificationEmail(
    email: string
  ) {
    return supabase.auth.resend({
      type: "signup",
      email,
    });
  },
};