// constants/forum.ts

import type { ForumFilter } from "@/types/types";

/**
 * ---------------------------------------
 * Forum Filters
 * ---------------------------------------
 */

export const FORUM_FILTERS: ForumFilter[] = [
  "All",
  "Most Answered",
  "Unanswered",
  "Solved"
];

/**
 * ---------------------------------------
 * Vehicle Types
 * ---------------------------------------
 */

export const VEHICLE_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Pickup",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  "Bus",
  "Truck",
  "Other",
] as const;

/**
 * ---------------------------------------
 * Common Tags
 * ---------------------------------------
 */

export const COMMON_TAGS = [
  "Toyota",
  "Honda",
  "Lexus",
  "Mercedes",

  "BMW",
  "Volkswagen",
  "Hyundai",
  "Kia",

  "Ford",
  "Nissan",
  "Peugeot",

  "Engine",
  "Transmission",
  "Suspension",
  "Brakes",

  "Steering",
  "Electrical",
  "Battery",

  "Cooling",

  "Radiator",

  "Air Conditioning",

  "Fuel",

  "Tyres",

  "Oil",

  "ECU",

  "Sensor",
] as const;

/**
 * ---------------------------------------
 * Vehicle Concerns
 * ---------------------------------------
 */

export const VEHICLE_CONCERNS = [
  {
    key: "hearConcern",
    label: "Hear Something",
  },

  {
    key: "seeConcern",
    label: "See Something",
  },

  {
    key: "smellConcern",
    label: "Smell Something",
  },

  {
    key: "feelConcern",
    label: "Feel Something",
  },

  {
    key: "notStarting",
    label: "Not Starting",
  },

  {
    key: "performanceConcern",
    label: "Performance Issue",
  },

  {
    key: "dashboardWarningLights",
    label: "Dashboard Warning",
  },
] as const;

/**
 * ---------------------------------------
 * Marketplace Categories
 * ---------------------------------------
 */

/**
 * Sponsored Marketplace
 */

export const MARKETPLACE_CATEGORIES = [
  "Parts",
  "Services",
  "Car Sales",
  "Accessories",
  "Tyres",
  "Batteries",
  "Lubricants",
  "Other",
] as const;

export const CATEGORY_COLORS = {
  Parts: "#3B82F6",
  Services: "#10B981",
  "Car Sales": "#F59E0B",
  Accessories: "#8B5CF6",
  Tyres: "#EF4444",
  Batteries: "#14B8A6",
  Lubricants: "#F97316",
  Other: "#6B7280",
} as const;

/**
 * ---------------------------------------
 * UI Constants
 * ---------------------------------------
 */

export const AD_BANNER_HEIGHT = 72;

export const SEARCH_DEBOUNCE_MS = 300;

export const MAX_TAGS = 15;

export const MAX_TITLE_LENGTH = 120;

export const MAX_DESCRIPTION_LENGTH =  2000;