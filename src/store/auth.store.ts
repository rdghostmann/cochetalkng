// src/store/auth.store.ts
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  session: Session | null;

  initialized: boolean;
  loading: boolean;

  pendingRedirect: string | null;

  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setInitialized: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setPendingRedirect: (route: string | null) => void;

  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,

  initialized: false,
  loading: true,

  pendingRedirect: null,

  setUser: (user) => set({ user }),

  setSession: (session) => set({ session }),

  setInitialized: (initialized) => set({ initialized }),

  setLoading: (loading) => set({ loading }),

  setPendingRedirect: (pendingRedirect) =>
    set({ pendingRedirect }),

  reset: () =>
    set({
      user: null,
      session: null,
      loading: false,
      initialized: true,
      pendingRedirect: null,
    }),
}));