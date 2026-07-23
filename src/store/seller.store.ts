import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { ForumUser } from "@/types/forum.types";

interface SellerStore {
  sellers: ForumUser[];

  isLoading: boolean;

  setLoading: (
    loading: boolean
  ) => void;

  setSellers: (
    sellers: ForumUser[]
  ) => void;

  addSeller: (
    seller: ForumUser
  ) => void;

  updateSeller: (
    id: string,
    data: Partial<ForumUser>
  ) => void;

  deleteSeller: (
    id: string
  ) => void;

  reset: () => void;
}

const initialState = {
  sellers: [] as ForumUser[],
  isLoading: false,
};

export const useSellerStore =
  create<SellerStore>()(
    devtools(
      (set) => ({
        ...initialState,

        setLoading: (loading) =>
          set({
            isLoading: loading,
          }),

        setSellers: (sellers) =>
          set({
            sellers,
          }),

        addSeller: (seller) =>
          set((state) => ({
            sellers: [
              seller,
              ...state.sellers,
            ],
          })),

        updateSeller: (
          id,
          data
        ) =>
          set((state) => ({
            sellers:
              state.sellers.map(
                (seller) =>
                  seller.id === id
                    ? {
                        ...seller,
                        ...data,
                      }
                    : seller
              ),
          })),

        deleteSeller: (id) =>
          set((state) => ({
            sellers:
              state.sellers.filter(
                (seller) =>
                  seller.id !== id
              ),
          })),

        reset: () =>
          set(initialState),
      }),
      {
        name: "SellerStore",
      }
    )
  );