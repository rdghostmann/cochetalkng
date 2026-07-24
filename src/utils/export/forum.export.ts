import {
  ForumAnswer,
  ForumQuestion,
  MarketplaceListing,
  Rating,
} from "@/types/types";

import { buildCsv } from "./csv";
import { downloadCsv } from "./download";

function datestamp() {
  return new Date().toISOString().split("T")[0];
}

export async function exportActivitiesReport(
  questions: ForumQuestion[],
  answers: ForumAnswer[],
  listings: MarketplaceListing[],
  ratings: Rating[],
): Promise<void> {
  /**
   * ---------------------------------------
   * Answer Count Lookup
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
    "Vehicle",
    "Tags",
    "Visibility",
    "Answers",
    "Created",
  ];

  const questionRows = questions.map((question) => [
    question.id,
    question.title,
    question.vehicleInfo?.type ?? "",
    [
      question.vehicleInfo?.year,
      question.vehicleInfo?.make,
      question.vehicleInfo?.model,
    ]
      .filter(Boolean)
      .join(" "),
    question.tags.join(", "),
    question.isPrivateEcosystem
      ? "Private"
      : "Public",
    String(answerCount.get(question.id) ?? 0),
    new Date(question.createdAt).toLocaleDateString(),
  ]);

  /**
   * ---------------------------------------
   * Answers
   * ---------------------------------------
   */

  const questionLookup = new Map(
    questions.map((q) => [q.id, q]),
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

  const answerRows = answers.map((answer) => {
    const question = questionLookup.get(
      answer.questionId,
    );

    return [
      answer.id,
      question?.title ?? "",
      answer.authorName,
      answer.authorRole,
      question?.acceptedAnswerId === answer.id
        ? "Yes"
        : "No",
      String(answer.upvotes),
      new Date(
        answer.createdAt,
      ).toLocaleDateString(),
    ];
  });

  /**
   * ---------------------------------------
   * Marketplace
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
      listing.sellerName,
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
    "Feedback",
  ];

  const ratingRows = ratings.map(
    (rating) => [
      rating.id,
      rating.providerId,
      rating.raterName,
      rating.ratingValue,
      rating.feedback,
    ],
  );

  /**
   * ---------------------------------------
   * CSV
   * ---------------------------------------
   */

  const csv = [
    "=== QUESTIONS ===",
    buildCsv(questionHeaders, questionRows),

    "",

    "=== ANSWERS ===",
    buildCsv(answerHeaders, answerRows),

    "",

    "=== MARKETPLACE ===",
    buildCsv(listingHeaders, listingRows),

    "",

    "=== RATINGS ===",
    buildCsv(ratingHeaders, ratingRows),
  ].join("\n");

  await downloadCsv(
    `cochetalk_activities_${datestamp()}.csv`,
    csv,
  );
}