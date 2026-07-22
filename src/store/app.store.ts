import { create } from "zustand";

export type ThemeMode =
  | "light"
  | "dark"
  | "system";

interface AppState {
  /**
   * App State
   */
  initialized: boolean;
  maintenanceMode: boolean;
  onboardingCompleted: boolean;
  isOnline: boolean;

  /**
   * Feature Flags
   */
  marketplaceVisible: boolean;
  clinicVisible: boolean;
  proVisible: boolean;
  chatEnabled: boolean;
  notificationsEnabled: boolean;

  /**
   * UI
   */
  theme: ThemeMode;

  /**
   * Actions
   */
  setInitialized: (
    value: boolean
  ) => void;

  setMaintenanceMode: (
    value: boolean
  ) => void;

  setOnboardingCompleted: (
    value: boolean
  ) => void;

  setOnline: (
    value: boolean
  ) => void;

  setTheme: (
    theme: ThemeMode
  ) => void;

  setMarketplaceVisible: (
    value: boolean
  ) => void;

  setClinicVisible: (
    value: boolean
  ) => void;

  setProVisible: (
    value: boolean
  ) => void;

  setChatEnabled: (
    value: boolean
  ) => void;

  setNotificationsEnabled: (
    value: boolean
  ) => void;

  reset: () => void;
}

export const useAppStore =
  create<AppState>((set) => ({
    /**
     * Initial State
     */
    initialized: false,

    maintenanceMode: false,

    onboardingCompleted: false,

    isOnline: true,

    marketplaceVisible: true,

    clinicVisible: true,

    proVisible: true,

    chatEnabled: true,

    notificationsEnabled: true,

    theme: "system",

    /**
     * Actions
     */
    setInitialized: (initialized) =>
      set({ initialized }),

    setMaintenanceMode: (
      maintenanceMode
    ) =>
      set({
        maintenanceMode,
      }),

    setOnboardingCompleted: (
      onboardingCompleted
    ) =>
      set({
        onboardingCompleted,
      }),

    setOnline: (isOnline) =>
      set({
        isOnline,
      }),

    setTheme: (theme) =>
      set({
        theme,
      }),

    setMarketplaceVisible: (
      marketplaceVisible
    ) =>
      set({
        marketplaceVisible,
      }),

    setClinicVisible: (
      clinicVisible
    ) =>
      set({
        clinicVisible,
      }),

    setProVisible: (
      proVisible
    ) =>
      set({
        proVisible,
      }),

    setChatEnabled: (
      chatEnabled
    ) =>
      set({
        chatEnabled,
      }),

    setNotificationsEnabled: (
      notificationsEnabled
    ) =>
      set({
        notificationsEnabled,
      }),

    reset: () =>
      set({
        initialized: false,
        maintenanceMode: false,
        onboardingCompleted: false,
        isOnline: true,
        marketplaceVisible: true,
        clinicVisible: true,
        proVisible: true,
        chatEnabled: true,
        notificationsEnabled: true,
        theme: "system",
      }),
  }));