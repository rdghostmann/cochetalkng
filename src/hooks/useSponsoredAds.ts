// hooks/useSponsoredAds.ts

import { useMarketplaceStore } from "@/store/marketplace.store";
import { MarketplaceListing } from "@/types/marketplace.types";
import { useMemo } from "react";

// import { useMarketplaceStore } from "@/stores/marketplaceStore";

// import type {
//   MarketplaceListing,
// } from "@/types/forum";

export function useSponsoredAds() {
  const listings =
    useMarketplaceStore(
      (state) => state.listings
    );

  /**
   * ---------------------------------
   * Featured & Approved Ads
   * ---------------------------------
   */

  const featuredAds =
    useMemo(() => {
      return listings.filter(
        (listing) =>
          listing.isApproved &&
          listing.isFeaturedBottom
      );
    }, [listings]);

  /**
   * ---------------------------------
   * Sponsored Parts
   * ---------------------------------
   */

  const partsAds =
    useMemo(() => {
      return featuredAds.filter(
        (listing) =>
          listing.category ===
          "Parts"
      );
    }, [featuredAds]);

  /**
   * ---------------------------------
   * Sponsored Services
   * ---------------------------------
   */

  const serviceAds =
    useMemo(() => {
      return featuredAds.filter(
        (listing) =>
          listing.category ===
          "Services"
      );
    }, [featuredAds]);

  /**
   * ---------------------------------
   * Sponsored Cars
   * ---------------------------------
   */

  const carSaleAds =
    useMemo(() => {
      return featuredAds.filter(
        (listing) =>
          listing.category ===
          "Car Sales"
      );
    }, [featuredAds]);

  /**
   * ---------------------------------
   * Get by Seller
   * ---------------------------------
   */

  const getSellerAds = (
    sellerId: string
  ): MarketplaceListing[] => {
    return listings.filter(
      (listing) =>
        listing.userId === sellerId
    );
  };

  /**
   * ---------------------------------
   * Get by Category
   * ---------------------------------
   */

  const getCategoryAds = (
    category: string
  ): MarketplaceListing[] => {
    return featuredAds.filter(
      (listing) =>
        listing.category ===
        category
    );
  };

  /**
   * ---------------------------------
   * Random Sponsored Ad
   * ---------------------------------
   */

  const randomAd =
    useMemo(() => {
      if (
        featuredAds.length === 0
      ) {
        return undefined;
      }

      const index =
        Math.floor(
          Math.random() *
            featuredAds.length
        );

      return featuredAds[index];
    }, [featuredAds]);

  /**
   * ---------------------------------
   * Statistics
   * ---------------------------------
   */

  const totalAds =
    listings.length;

  const totalFeaturedAds =
    featuredAds.length;

  const hasSponsoredAds =
    featuredAds.length > 0;

  return {
    listings,

    featuredAds,

    partsAds,

    serviceAds,

    carSaleAds,

    randomAd,

    totalAds,

    totalFeaturedAds,

    hasSponsoredAds,

    getSellerAds,

    getCategoryAds,
  };
}