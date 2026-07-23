import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { Rating } from "@/types/rating.types";

interface RatingStore {
  ratings: Rating[];

  addRating: (
    rating: Rating
  ) => void;

  updateRating: (
    id: string,
    data: Partial<Rating>
  ) => void;

  deleteRating: (
    id: string
  ) => void;

  reset: () => void;
}

const initialState = {
  ratings: [] as Rating[],
};

export const useRatingStore =
  create<RatingStore>()(
    devtools(
      (set) => ({
        ...initialState,

        addRating: (
          rating
        ) =>
          set((state) => ({
            ratings: [
              rating,
              ...state.ratings,
            ],
          })),

        updateRating: (
          id,
          data
        ) =>
          set((state) => ({
            ratings:
              state.ratings.map(
                (rating) =>
                  rating.id === id
                    ? {
                        ...rating,
                        ...data,
                      }
                    : rating
              ),
          })),

        deleteRating: (
          id
        ) =>
          set((state) => ({
            ratings:
              state.ratings.filter(
                (rating) =>
                  rating.id !== id
              ),
          })),

        reset: () =>
          set(initialState),
      }),
      {
        name: "RatingStore",
      }
    )
  );