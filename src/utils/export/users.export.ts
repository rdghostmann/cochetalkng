// src/utils/export/users.export.ts

import { Answer, ForumQuestion, MarketplaceListing } from "@/types/forum.types";
import { UserProfile } from "@/types/profile.types";
import { ProviderRating } from "@/providers/ProviderRating.types";

import { buildCsv } from "./csv";
import { downloadCsv } from "./download";

function datestamp() {
  return new Date().toISOString().split("T")[0];
}

export async function exportUsersReport(
  users: UserProfile[],
  questions: ForumQuestion[],
  answers: Answer[],
  listings: MarketplaceListing[],
  ratings: ProviderRating[],
): Promise<void> {
  /**
   * ---------------------------------------
   * Build lookup maps (O(n))
   * ---------------------------------------
   */

  const questionCount = new Map<string, number>();

  for (const question of questions) {
    questionCount.set(
      question.userId,
      (questionCount.get(question.userId) ?? 0) + 1,
    );
  }

  const answerCount = new Map<string, number>();

  for (const answer of answers) {
    answerCount.set(
      answer.userId,
      (answerCount.get(answer.userId) ?? 0) + 1,
    );
  }

  const listingCount = new Map<string, number>();

  for (const listing of listings) {
    listingCount.set(
      listing.userId,
      (listingCount.get(listing.userId) ?? 0) + 1,
    );
  }

  const ratingTotals = new Map<
    string,
    {
      total: number;
      count: number;
    }
  >();

  for (const rating of ratings) {
    const current =
      ratingTotals.get(rating.providerId) ?? {
        total: 0,
        count: 0,
      };

    current.total += rating.rating;
    current.count += 1;

    ratingTotals.set(
      rating.providerId,
      current,
    );
  }

  /**
   * ---------------------------------------
   * CSV Headers
   * ---------------------------------------
   */

  const headers = [
    "Full Name",
    "Email",
    "Questions",
    "Answers",
    "Listings",
    "Average Rating",
    "Ratings",
  ];

  /**
   * ---------------------------------------
   * CSV Rows
   * ---------------------------------------
   */

  const rows = users.map((user) => {
    const stats =
      ratingTotals.get(user.id);

    const averageRating =
      stats
        ? (
            stats.total /
            stats.count
          ).toFixed(2)
        : "";

    return [
      user.full_name,
      user.email,
      String(
        questionCount.get(user.id) ?? 0,
      ),
      String(
        answerCount.get(user.id) ?? 0,
      ),
      String(
        listingCount.get(user.id) ?? 0,
      ),
      averageRating,
      String(stats?.count ?? 0),
    ];
  });

  const csv = buildCsv(
    headers,
    rows,
  );

  await downloadCsv(
    `cochetalk_users_${datestamp()}.csv`,
    csv,
  );
}