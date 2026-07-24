// src/features/auth/controllers/auth.controller.ts

import { AuthService } from "../services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export class AuthController {
  /**
   * Sign In
   */
  static async signIn(
    email: string,
    password: string
  ) {
    const { data, error } =
      await AuthService.signIn(
        email,
        password
      );

    if (error) {
      throw error;
    }

    if (!data.session || !data.user) {
      throw new Error(
        "Failed to create user session."
      );
    }

    const { data: profile, error: profileError } =
      await AuthService.getProfile(
        data.user.id
      );

    if (profileError) {
      throw profileError;
    }

    const store = useAuthStore.getState();

    store.setSession(data.session);
    store.setUser(data.user);
    store.setProfile(profile);

    return {
      user: data.user,
      session: data.session,
      profile,
    };
  }

  /**
   * Register
   */
  static async signUp(
    fullName: string,
    email: string,
    password: string
  ) {
    const { data, error } =
      await AuthService.signUp(
        email,
        password,
        fullName
      );

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error(
        "Unable to create account."
      );
    }

    const { error: profileError } =
      await AuthService.createProfile({
        id: data.user.id,
        email,
        full_name: fullName,
      });

    if (profileError) {
      throw profileError;
    }

    return data.user;
  }

  /**
   * Refresh Profile
   */
  static async refreshProfile() {
    const store = useAuthStore.getState();

    if (!store.user) {
      return null;
    }

    const { data, error } =
      await AuthService.getProfile(
        store.user.id
      );

    if (error) {
      throw error;
    }

    store.setProfile(data);

    return data;
  }

  /**
   * Update Profile
   */
  static async updateProfile(
    values: Record<string, unknown>
  ) {
    const store = useAuthStore.getState();

    if (!store.user) {
      throw new Error(
        "User not authenticated."
      );
    }

    const { data, error } =
      await AuthService.updateProfile(
        store.user.id,
        values
      );

    if (error) {
      throw error;
    }

    store.setProfile(data);

    return data;
  }

  /**
   * Sign Out
   */
  static async signOut() {
    const { error } =
      await AuthService.signOut();

    if (error) {
      throw error;
    }

    useAuthStore.getState().reset();
  }

  /**
   * Restore Session
   */
  static async restoreSession() {
    const {
      data: { session },
      error,
    } = await AuthService.getSession();

    if (error) {
      throw error;
    }

    if (!session) {
      useAuthStore.getState().reset();
      return null;
    }

    const { data: profile } =
      await AuthService.getProfile(
        session.user.id
      );

    const store = useAuthStore.getState();

    store.setSession(session);
    store.setUser(session.user);
    store.setProfile(profile ?? null);
    store.setInitialized(true);
    store.setLoading(false);

    return session;
  }
}