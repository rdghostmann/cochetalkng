// src/types/profile.types.ts

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  role: "Car Owner" | "Mechanic" | "Service Provider" | "Admin";
  created_at?: string;
  updated_at?: string;
}