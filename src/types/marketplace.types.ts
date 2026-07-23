// src/types/marketplace.types.ts

export type MarketplaceCategory =
  | "Parts"
  | "Services"
  | "Car Sales"
  | "Accessories"
  | "Tyres"
  | "Batteries"
  | "Lubricants"
  | "Other";

export interface MarketplaceListing {
  id: string;

  title: string;

  description: string;

  price: number;

  /**
   * Seller
   */
  userId: string;

  userName: string;

  userAvatar?: string;

  sellerId?: string;

  /**
   * Marketplace
   */
  category: MarketplaceCategory;

  location: string;

  images: string[];

  createdAt: string;

  timestamp: number;

  /**
   * Moderation
   */
  isApproved: boolean;

  isRejected?: boolean;

  /**
   * Featured advertisement
   */
  isFeaturedBottom: boolean;

  isFeaturedTop?: boolean;

  /**
   * Listing status
   */
  status?:
    | "active"
    | "pending"
    | "sold"
    | "rejected";

  /**
   * Optional vehicle metadata
   */
  vehicle?: {
    make?: string;

    model?: string;

    year?: number;

    mileage?: number;

    transmission?:
      | "Automatic"
      | "Manual";

    fuelType?:
      | "Petrol"
      | "Diesel"
      | "Hybrid"
      | "Electric";
  };
}