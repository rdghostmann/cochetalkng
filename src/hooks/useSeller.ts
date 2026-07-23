import { useMemo } from "react";

import { useForumStore } from "@/store/forum.store";
import { useMarketplaceStore } from "@/store/marketplace.store";
import { useRatingStore } from "@/store/rating.store";
import { useSellerStore } from "@/store/seller.store";

export function useSeller(
  sellerId: string
) {
  const seller =
    useSellerStore((state) =>
      state.sellers.find(
        (seller) =>
          seller.id === sellerId
      )
    );

  const questions =
    useForumStore(
      (state) => state.questions
    );

  const answers =
    useForumStore(
      (state) => state.answers
    );

  const listings =
    useMarketplaceStore(
      (state) => state.listings
    );

  const ratings =
    useRatingStore(
      (state) => state.ratings
    );

  const sellerListings =
    useMemo(
      () =>
        listings
          .filter(
            (listing) =>
              listing.userId ===
                sellerId &&
              listing.isApproved
          )
          .sort(
            (a, b) =>
              Number(
                b.createdAt
              ) -
              Number(
                a.createdAt
              )
          ),
      [listings, sellerId]
    );

  const sellerQuestions =
    useMemo(
      () =>
        questions
          .filter(
            (question) =>
              question.userId ===
                sellerId &&
              !question.isPrivateEcosystem
          )
          .sort(
            (a, b) =>
              b.timestamp -
              a.timestamp
          ),
      [questions, sellerId]
    );

  const sellerRatings =
    useMemo(
      () =>
        ratings.filter(
          (rating) =>
            rating.providerId ===
            sellerId
        ),
      [ratings, sellerId]
    );

  const averageRating =
    useMemo(() => {
      if (
        sellerRatings.length === 0
      )
        return 0;

      return (
        sellerRatings.reduce(
          (sum, rating) =>
            sum +
            rating.ratingValue,
          0
        ) /
        sellerRatings.length
      );
    }, [sellerRatings]);

  const answerCount =
    useMemo(
      () =>
        sellerQuestions.reduce(
          (count, question) =>
            count +
            answers.filter(
              (answer) =>
                answer.questionId ===
                question.id
            ).length,
          0
        ),
      [
        sellerQuestions,
        answers,
      ]
    );

  return {
    seller,

    sellerListings,

    sellerQuestions,

    sellerRatings,

    averageRating,

    answerCount,
  };
}