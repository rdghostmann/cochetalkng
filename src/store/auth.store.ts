// src/store/auth.store.ts
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

export interface UserProfile {
  id: string;

  email: string;

  full_name: string;

  avatar_url?: string | null;

  phone?: string | null;

  role: string;

  created_at?: string;

  updated_at?: string;
}

interface AuthState {
  user: User | null;

  session: Session | null;

  profile: UserProfile | null;

  initialized: boolean;

  loading: boolean;

  pendingRedirect: string | null;

  setUser(user: User | null): void;

  setSession(session: Session | null): void;

  setProfile(profile: UserProfile | null): void;

  setInitialized(value: boolean): void;

  setLoading(value: boolean): void;

  setPendingRedirect(route: string | null): void;

  reset(): void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  session: null,

  profile: null,

  initialized: false,

  loading: true,

  pendingRedirect: null,

  setUser: (user) =>
    set({
      user,
    }),

  setSession: (session) =>
    set({
      session,
    }),

  setProfile: (profile) =>
    set({
      profile,
    }),

  setInitialized: (initialized) =>
    set({
      initialized,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setPendingRedirect: (pendingRedirect) =>
    set({
      pendingRedirect,
    }),

  reset: () =>
    set({
      user: null,
      session: null,
      profile: null,
      initialized: true,
      loading: false,
      pendingRedirect: null,
    }),
}));