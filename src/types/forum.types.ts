// src/types/forum.types.ts

export type UserRole =
  | "Car Owner"
  | "Service Provider"
  | "Admin";

export interface ForumUser {
  id: string;
  name: string;
  role: UserRole;
  verified: boolean;
  specialization?: string;
}

export interface Question {
  id: string;
  title: string;
  body: string;

  author: ForumUser;

  createdAt: string;

  tags: string[];

  upvotes: number;

  acceptedAnswerId?: string;

  vehicle?: {
    yearModel?: string;
    type?: string;
  };

  concerns?: {
    see?: boolean;
    hear?: boolean;
    smell?: boolean;
    feel?: boolean;
    notStarting?: boolean;
    performance?: boolean;
    dashboardWarningLights?: boolean;
  };
}

export interface Answer {
  id: string;

  questionId: string;

  body: string;

  userId: string;

  userName: string;

  userRole: UserRole;

  userSpecialization?: string;

  userVerified: boolean;

  createdAt: string;

  timestamp: number;

  upvotes: number;

  isAccepted?: boolean;
}