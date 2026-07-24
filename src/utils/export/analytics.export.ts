import {
  Answer,
  ForumQuestion,
  MarketplaceListing,
} from "@/types/forum.types";

import { UserProfile } from "@/types/profile.types";

import { ProviderRating } from "@/providers/ProviderRating.types";

import { buildCsv } from "./csv";
import { downloadCsv } from "./download";

function datestamp() {
  return new Date().toISOString().split("T")[0];
}

export async function exportAnalyticsReport(
  users: UserProfile[],
  questions: ForumQuestion[],
  answers: Answer[],
  listings: MarketplaceListing[],
  ratings: ProviderRating[],
): Promise<void> {
  /**
   * ---------------------------------------
   * Question Statistics
   * ---------------------------------------
   */

  const publicQuestions =
    questions.filter(
      (question) =>
        !question.isPrivateEcosystem,
    ).length;

  const privateQuestions =
    questions.filter(
      (question) =>
        question.isPrivateEcosystem,
    ).length;

  const averageAnswers =
    questions.length === 0
      ? 0
      : (
          answers.length /
          questions.length
        ).toFixed(2);

  /**
   * ---------------------------------------
   * Marketplace
   * ---------------------------------------
   */

  const approvedListings =
    listings.filter(
      (listing) =>
        listing.isApproved,
    ).length;

  const featuredListings =
    listings.filter(
      (listing) =>
        listing.isFeaturedBottom,
    ).length;

  const totalListingValue =
    listings.reduce(
      (sum, listing) =>
        sum + listing.price,
      0,
    );

  /**
   * ---------------------------------------
   * Ratings
   * ---------------------------------------
   */

  const averageRating =
    ratings.length === 0
      ? "0.00"
      : (
          ratings.reduce(
            (sum, rating) =>
              sum + rating.rating,
            0,
          ) / ratings.length
        ).toFixed(2);

  /**
   * ---------------------------------------
   * Contributor Score
   * ---------------------------------------
   */

  const questionCount =
    new Map<string, number>();

  const answerCount =
    new Map<string, number>();

  const listingCount =
    new Map<string, number>();

  for (const question of questions) {
    questionCount.set(
      question.userId,
      (questionCount.get(
        question.userId,
      ) ?? 0) + 1,
    );
  }

  for (const answer of answers) {
    answerCount.set(
      answer.userId,
      (answerCount.get(
        answer.userId,
      ) ?? 0) + 1,
    );
  }

  for (const listing of listings) {
    listingCount.set(
      listing.userId,
      (listingCount.get(
        listing.userId,
      ) ?? 0) + 1,
    );
  }

  const contributors = users
    .map((user) => ({
      name: user.fullName,

      score:
        (questionCount.get(user.id) ??
          0) *
          3 +
        (answerCount.get(user.id) ??
          0) *
          2 +
        (listingCount.get(user.id) ??
          0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score,
    )
    .slice(0, 5);

  /**
   * ---------------------------------------
   * CSV
   * ---------------------------------------
   */

  const rows = [
    [
      "Report Generated",
      new Date().toLocaleString(),
    ],

    [],

    ["Total Users", users.length],

    ["Total Questions", questions.length],

    [
      "Public Questions",
      publicQuestions,
    ],

    [
      "Private Questions",
      privateQuestions,
    ],

    [
      "Total Answers",
      answers.length,
    ],

    [
      "Average Answers / Question",
      averageAnswers,
    ],

    [],

    [
      "Marketplace Listings",
      listings.length,
    ],

    [
      "Approved Listings",
      approvedListings,
    ],

    [
      "Featured Listings",
      featuredListings,
    ],

    [
      "Marketplace Value (₦)",
      totalListingValue,
    ],

    [],

    [
      "Total Ratings",
      ratings.length,
    ],

    [
      "Average Rating",
      averageRating,
    ],

    [],

    ["Top Contributors", ""],

    ...contributors.map(
      (contributor, index) => [
        `#${index + 1}`,
        `${contributor.name} (${contributor.score})`,
      ],
    ),
  ];

  const csv = buildCsv(
    ["Metric", "Value"],
    rows,
  );

  await downloadCsv(
    `cochetalk_analytics_${datestamp()}.csv`,
    csv,
  );
}