// src/providers/ProviderRating.types.ts
export interface ProviderRating {
  id: string;

  providerId: string;

  userId: string;

  rating: number;

  review?: string;
}