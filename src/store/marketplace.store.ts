// stores/marketplaceStore.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type {
  MarketplaceListing,
} from "@/types/marketplace.types";

interface MarketplaceStore {
  listings: MarketplaceListing[];
  featuredAds: MarketplaceListing[];

  isLoading: boolean;

  setLoading: (
    loading: boolean
  ) => void;

  setListings: (
    listings: MarketplaceListing[]
  ) => void;

  addListing: (
    listing: MarketplaceListing
  ) => void;

  updateListing: (
    id: string,
    data: Partial<MarketplaceListing>
  ) => void;

  deleteListing: (
    id: string
  ) => void;

  approveListing: (
    id: string
  ) => void;

  rejectListing: (
    id: string
  ) => void;

  toggleFeatured: (
    id: string
  ) => void;

  reset: () => void;
}

const initialState = {
  listings: [] as MarketplaceListing[],
  featuredAds: [],

  isLoading: false,
};

export const useMarketplaceStore =
  create<MarketplaceStore>()(
    devtools(
      (set) => ({
        ...initialState,

        setLoading: (
          loading
        ) =>
          set({
            isLoading: loading,
          }),

        setListings: (
          listings
        ) =>
          set({
            listings,
          }),

        addListing: (
          listing
        ) =>
          set((state) => ({
            listings: [
              listing,
              ...state.listings,
            ],
          })),

        updateListing: (
          id,
          data
        ) =>
          set((state) => ({
            listings:
              state.listings.map(
                (listing) =>
                  listing.id === id
                    ? {
                        ...listing,
                        ...data,
                      }
                    : listing
              ),
          })),

        deleteListing: (
          id
        ) =>
          set((state) => ({
            listings:
              state.listings.filter(
                (listing) =>
                  listing.id !== id
              ),
          })),

        approveListing: (
          id
        ) =>
          set((state) => ({
            listings:
              state.listings.map(
                (listing) =>
                  listing.id === id
                    ? {
                        ...listing,
                        isApproved: true,
                        isRejected: false,
                        status: "active",
                      }
                    : listing
              ),
          })),

        rejectListing: (
          id
        ) =>
          set((state) => ({
            listings:
              state.listings.map(
                (listing) =>
                  listing.id === id
                    ? {
                        ...listing,
                        isApproved: false,
                        isRejected: true,
                        status: "rejected",
                      }
                    : listing
              ),
          })),

        toggleFeatured: (
          id
        ) =>
          set((state) => ({
            listings:
              state.listings.map(
                (listing) =>
                  listing.id === id
                    ? {
                        ...listing,
                        isFeaturedBottom:
                          !listing.isFeaturedBottom,
                      }
                    : listing
              ),
          })),

        reset: () =>
          set(initialState),
      }),
      {
        name: "MarketplaceStore",
      }
    )
  );

/* --------------------------------------- */
/* Selectors                               */
/* --------------------------------------- */

export const useFeaturedListings =
  () =>
    useMarketplaceStore(
      (state) =>
        state.listings.filter(
          (listing) =>
            listing.isApproved &&
            listing.isFeaturedBottom
        )
    );

export const useApprovedListings =
  () =>
    useMarketplaceStore(
      (state) =>
        state.listings.filter(
          (listing) =>
            listing.isApproved
        )
    );

export const useSellerListings = (
  userId: string
) =>
  useMarketplaceStore(
    (state) =>
      state.listings.filter(
        (listing) =>
          listing.userId === userId
      )
  );

export const useListingById = (
  id: string
) =>
  useMarketplaceStore(
    (state) =>
      state.listings.find(
        (listing) =>
          listing.id === id
      )
  );