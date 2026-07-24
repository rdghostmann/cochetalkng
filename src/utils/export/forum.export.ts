import {
  Answer,
  ForumQuestion,
  MarketplaceListing,
} from "@/types/forum.types";
import { ProviderRating } from "@/providers/ProviderRating.types";

import { buildCsv } from "./csv";
import { downloadCsv } from "./download";

function datestamp() {
  return new Date().toISOString().split("T")[0];
}

export async function exportActivitiesReport(
  questions: ForumQuestion[],
  answers: Answer[],
  listings: MarketplaceListing[],
  ratings: ProviderRating[],
): Promise<void> {
  /**
   * ---------------------------------------
   * Build Answer Count Lookup
   * ---------------------------------------
   */

  const answerCount = new Map<string, number>();

  for (const answer of answers) {
    answerCount.set(
      answer.questionId,
      (answerCount.get(answer.questionId) ?? 0) + 1,
    );
  }

  /**
   * ---------------------------------------
   * Questions
   * ---------------------------------------
   */

  const questionHeaders = [
    "Question ID",
    "Title",
    "Vehicle Type",
    "Year / Model",
    "Tags",
    "Visibility",
    "Answers",
    "Created",
  ];

  const questionRows = questions.map((question) => [
    question.id,
    question.title,
    question.vehicleType,
    question.yrModel ?? "",
    question.tags,
    question.isPrivateEcosystem
      ? "Private"
      : "Public",
    String(
      answerCount.get(question.id) ?? 0,
    ),
    new Date(
      question.timestamp,
    ).toLocaleDateString(),
  ]);

  /**
   * ---------------------------------------
   * Answers
   * ---------------------------------------
   */

  const questionLookup = new Map(
    questions.map((question) => [
      question.id,
      question.title,
    ]),
  );

  const answerHeaders = [
    "Answer ID",
    "Question",
    "Author",
    "Role",
    "Accepted",
    "Upvotes",
    "Created",
  ];

  const answerRows = answers.map((answer) => [
    answer.id,
    questionLookup.get(
      answer.questionId,
    ) ?? "",
    answer.userName,
    answer.userRole,
    answer.isAccepted
      ? "Yes"
      : "No",
    String(answer.upvotes),
    new Date(
      answer.timestamp,
    ).toLocaleDateString(),
  ]);

  /**
   * ---------------------------------------
   * Listings
   * ---------------------------------------
   */

  const listingHeaders = [
    "Listing ID",
    "Title",
    "Seller",
    "Category",
    "Price (₦)",
    "Location",
    "Approved",
    "Featured",
  ];

  const listingRows = listings.map(
    (listing) => [
      listing.id,
      listing.title,
      listing.userName,
      listing.category,
      listing.price,
      listing.location,
      listing.isApproved
        ? "Yes"
        : "No",
      listing.isFeaturedBottom
        ? "Yes"
        : "No",
    ],
  );

  /**
   * ---------------------------------------
   * Ratings
   * ---------------------------------------
   */

  const ratingHeaders = [
    "Rating ID",
    "Provider",
    "User",
    "Rating",
    "Review",
  ];

  const ratingRows = ratings.map(
    (rating) => [
      rating.id,
      rating.providerId,
      rating.userId,
      rating.rating,
      rating.review ?? "",
    ],
  );

  /**
   * ---------------------------------------
   * Merge Sections
   * ---------------------------------------
   */

  const csv = [
    "=== QUESTIONS ===",
    buildCsv(
      questionHeaders,
      questionRows,
    ),

    "",

    "=== ANSWERS ===",
    buildCsv(
      answerHeaders,
      answerRows,
    ),

    "",

    "=== MARKETPLACE ===",
    buildCsv(
      listingHeaders,
      listingRows,
    ),

    "",

    "=== PROVIDER RATINGS ===",
    buildCsv(
      ratingHeaders,
      ratingRows,
    ),
  ].join("\n");

  await downloadCsv(
    `cochetalk_activities_${datestamp()}.csv`,
    csv,
  );
}