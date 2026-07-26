// .src/types/types.ts (All types)

export const USER_ROLE = {
    OWNER: "Car Owner",
    PROVIDER: "Service Provider",
    ADMIN: "Admin",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];


export interface BaseEntity {
    id: string;
    createdAt: string;
}

export interface UserVehicle {
    make: string;
    model: string;
    year: number;
    type?: string;
    vin?: string;
    mileage?: number;
}

export interface UserSummary {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string | null;
    role: UserRole;
    isVerified: boolean;
}

export interface UserProfile
    extends UserSummary {
    whatsappNumber?: string;
    location: string;
    bio?: string;
    garage?: UserVehicle[];
    specialties?: string[];
    joinedDate: string;
    rating?: number;
    reviewCount?: number;
    created_at?: string;
    updated_at?: string;
}


export interface VehicleConcerns {
    hearConcern: boolean;

    seeConcern: boolean;

    smellConcern: boolean;

    feelConcern: boolean;

    notStarting: boolean;

    performanceConcern: boolean;

    dashboardWarningLights: boolean;
}


export interface ForumQuestion
  extends BaseEntity {
    userId: string;
    title: string;
    description: string;
    authorEmail: string;
    authorName: string;
    authorAvatar: string;
    authorRole: UserRole;
    authorVerified: boolean;
    tags: string[];
    vehicleInfo?: UserVehicle;
    isPrivateEcosystem: boolean;
    upvotes: number;
    upvotedBy: string[];
    answersCount: number;
    acceptedAnswerId?: string;
    views: number;
    bookmarked?: boolean;
    isSolved?: boolean;
}

export interface ForumComment
  extends BaseEntity {
    targetId: string;
    authorEmail: string;
    authorName: string;
    authorAvatar: string;
    body: string;
}

export interface ForumAnswer
  extends BaseEntity {
    questionId: string;
    authorEmail: string;
    authorName: string;
    authorAvatar: string;
    authorRole: UserRole;
    authorVerified: boolean;
    body: string;
    upvotes: number;
    upvotedBy: string[];
    createdAt: string;
    comments?: ForumComment[];
}

export const MARKETPLACE_CATEGORY = {
    PARTS: "Parts",
    SERVICES: "Services",
    CAR_SALES: "Car Sales",
    TOOLS: "Tools & Diagnostics",
} as const;

export type MarketplaceCategory =
    (typeof MARKETPLACE_CATEGORY)[keyof typeof MARKETPLACE_CATEGORY];

export const CONDITION = {
    NEW: "New",
    TOKUNBO: "Tokunbo (Used Imported)",
    REFURBISHED: "Refurbished",
    FAIRLY_USED: "Fairly Used",
} as const;

export type Condition =
    (typeof CONDITION)[keyof typeof CONDITION];

export const MARKETPLACE_STATUS = {
    ACTIVE: "active",
    PENDING: "pending",
    SOLD: "sold",
    REJECTED: "rejected",
} as const;

export type MarketplaceStatus =
    (typeof MARKETPLACE_STATUS)[keyof typeof MARKETPLACE_STATUS];

export interface MarketplaceListing
  extends BaseEntity {
    userId: string;
    title: string;
    description: string;
    category: MarketplaceCategory;
    price: number;
    condition: Condition;
    location: string;
    sellerEmail: string;
    sellerName: string;
    sellerId?: string;
    sellerAvatar: string;
    sellerVerified: boolean;
    whatsappNumber?: string;
    whatsappEnabled?: boolean;
    images: string[];
    isApproved: boolean;
    isRejected?: boolean;
    isFeaturedBottom: boolean; // Banner featured in forum
    isFeaturedTop?: boolean;
    status: MarketplaceStatus;
    vehicle?: UserVehicle & {
        transmission?: "Automatic" | "Manual";

        fuelType?:
        | "Petrol"
        | "Diesel"
        | "Hybrid"
        | "Electric";
    };
    views: number;
}

export interface Message
  extends BaseEntity {
    conversationId: string;
    senderEmail: string;
    recipientEmail: string;
    text: string;
    createdAt: string;
    read: boolean;
}

export interface Conversation {
    id: string;
    participantEmails: string[];
    lastMessage: string;
    lastUpdated: string;
    unreadCount: Record<string, number>;
}

export interface CmsConfig {
    announcementText: string;
    announcementActive: boolean;
    availableTags: string[];
    logoUri: string;
    proCircleEnabled: boolean;
    marketplaceEnabled: boolean;
    clinicEnabled: boolean;
}

export const DIAGNOSIS_URGENCY = {
    CRITICAL: "Critical",
    SEVERE: "Severe",
    MODERATE: "Moderate",
    MINOR: "Minor",
} as const;

export type DiagnosisUrgency =
    (typeof DIAGNOSIS_URGENCY)[keyof typeof DIAGNOSIS_URGENCY];

export interface DiagnosisResult {
    primaryCause: string;
    urgency: DiagnosisUrgency;
    potentialCauses: Array<{
        cause: string;
        probability: string;
        description: string;
    }>;
    estimatedCostNgn: {
        min: number;
        max: number;
        text: string;
    };
    summary: string;
    diyVsMechanicAdvice: string;
    recommendedParts: string[];
    suggestedMechanicSpecialty: string;
}


export interface QuestionPayload
  extends VehicleConcerns {
  title: string;
  description: string;
  tags: string[];
  vehicleInfo?: UserVehicle;
  isPrivateEcosystem: boolean;
}



export interface Rating {
    id: string;
    providerId: string;
    raterId: string;
    raterName: string;
    ratingValue: number;
    feedback: string;
    timestamp: number;
}

export type ForumFilter =
    | "All"
    | "Latest"
    | "Most Answered"
    | "Solved"
    | "Unanswered";

export interface Author {
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
  verified: boolean;
}

export interface Timestamped {
  createdAt: string;
}

export interface Votable {
  upvotes: number;
  upvotedBy: string[];
}