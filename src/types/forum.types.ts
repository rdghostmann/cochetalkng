// src/types/forum.types.ts

/**
 * ---------------------------------------
 * User Roles
 * ---------------------------------------
 */

export type UserRole =
  | "Car Owner"
  | "Mechanic"
  | "Service Provider"
  | "Auto Parts Dealer"
  | "Car Dealer"
  | "Admin";

/**
 * ---------------------------------------
 * Forum User
 * ---------------------------------------
 */

export interface ForumUser {
  id: string;

  name: string;

  avatar?: string;

  role: UserRole;

  verified: boolean;

  specialization?: string;

  location?: string;
}

/**
 * ---------------------------------------
 * Vehicle Information
 * ---------------------------------------
 */

export interface VehicleInfo {
  yrModel?: string;

  make?: string;

  model?: string;

  type?: string;
}

/**
 * ---------------------------------------
 * Vehicle Concerns
 * ---------------------------------------
 */

export interface VehicleConcerns {
  hearConcern: boolean;

  seeConcern: boolean;

  smellConcern: boolean;

  feelConcern: boolean;

  notStarting: boolean;

  performanceConcern: boolean;

  dashboardWarningLights: boolean;
}

/**
 * ---------------------------------------
 * Forum Question
 * ---------------------------------------
 */

export interface ForumQuestion
  extends VehicleConcerns {
  id: string;

  userId: string;

  title: string;

  description: string;

  tags: string;

  vehicleType: string;

  yrModel?: string;

  isPrivateEcosystem: boolean;

  timestamp: number;

  upvotes?: number;

  views?: number;

  answerCount?: number;

  acceptedAnswerId?: string;
}

/**
 * ---------------------------------------
 * Payload used when creating a question
 * ---------------------------------------
 */

export interface QuestionPayload
  extends VehicleConcerns {
  userId: string;

  title: string;

  description: string;

  tags: string;

  vehicleType: string;

  yrModel?: string;

  isPrivateEcosystem: boolean;
}

/**
 * ---------------------------------------
 * Forum Answer
 * ---------------------------------------
 */

export interface Answer {
  id: string;

  questionId: string;

  body: string;

  userId: string;

  userName: string;

  userRole: UserRole;

  userVerified: boolean;

  userSpecialization?: string;

  createdAt: string;

  timestamp: number;

  upvotes: number;

  isAccepted?: boolean;
}

/**
 * ---------------------------------------
 * Marketplace
 * ---------------------------------------
 */

export type MarketplaceCategory =
  | "Parts"
  | "Services"
  | "Car Sales";

/**
 * ---------------------------------------
 * Marketplace Listing
 * ---------------------------------------
 */

export interface MarketplaceListing {
  id: string;

  userId: string;

  userName: string;

  title: string;

  description?: string;

  category: MarketplaceCategory;

  location: string;

  price: number;

  image?: string;

  images?: string[];

  isApproved: boolean;

  isFeaturedBottom: boolean;

  createdAt?: string;

  updatedAt?: string;
}

/**
 * ---------------------------------------
 * CMS Configuration
 * ---------------------------------------
 */

export interface ForumCMSConfig {
  forumLogoUri?: string;

  announcementActive: boolean;

  announcementText?: string;
}

/**
 * ---------------------------------------
 * Filter Options
 * ---------------------------------------
 */

export type ForumFilter =
  | "Latest"
  | "Most Answered"
  | "Unanswered";