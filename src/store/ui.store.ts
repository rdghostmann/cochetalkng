import { create } from "zustand";

interface UIState {
  isLoading: boolean;

  activeTab: string;

  isBottomSheetOpen: boolean;

  modal: string | null;

  setLoading: (loading: boolean) => void;

  setActiveTab: (tab: string) => void;

  openBottomSheet: () => void;

  closeBottomSheet: () => void;

  openModal: (id: string) => void;

  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,

  activeTab: "home",

  isBottomSheetOpen: false,

  modal: null,

  setLoading: (isLoading) => set({ isLoading }),

  setActiveTab: (activeTab) => set({ activeTab }),

  openBottomSheet: () =>
    set({
      isBottomSheetOpen: true,
    }),

  closeBottomSheet: () =>
    set({
      isBottomSheetOpen: false,
    }),

  openModal: (modal) =>
    set({
      modal,
    }),

  closeModal: () =>
    set({
      modal: null,
    }),
}));