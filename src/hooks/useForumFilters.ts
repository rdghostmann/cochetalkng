import { useMemo, useState } from "react";

import type { ForumQuestion } from "@/types/types";

export const FILTER_OPTIONS = [
  "Latest",
  "Most Answered",
  "Unanswered",
] as const;

export type ForumFilter =
  (typeof FILTER_OPTIONS)[number];

interface Params {
  questions: ForumQuestion[];

  answers: {
    questionId: string;
  }[];
}

export function useForumFilters({
  questions,
  answers,
}: Params) {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<ForumFilter>("Latest");

  const [activeTag, setActiveTag] =
    useState("");

  /**
   * Tags
   */

  const tags = useMemo(() => {
    const tagSet = new Set<string>();

    questions.forEach((question) => {
      question.tags.forEach((tag) =>
        tagSet.add(tag)
      );
    });

    return [...tagSet].sort();
  }, [questions]);

  /**
   * Filter
   */

  const filteredQuestions =
    useMemo(() => {
      let result = [...questions];

      /**
       * Search
       */

      if (searchQuery.trim()) {
        const keyword =
          searchQuery.toLowerCase();

        result = result.filter(
          (question) =>
            question.title
              .toLowerCase()
              .includes(keyword) ||
            question.description
              .toLowerCase()
              .includes(keyword) ||
            question.tags.some((tag) =>
              tag
                .toLowerCase()
                .includes(keyword)
            ) ||
            question.vehicleInfo?.make
              ?.toLowerCase()
              .includes(keyword) ||
            question.vehicleInfo?.model
              ?.toLowerCase()
              .includes(keyword) ||
            question.vehicleInfo?.type
              ?.toLowerCase()
              .includes(keyword) ||
            question.vehicleInfo?.year
              ?.toString()
              .includes(keyword)
        );
      }

      /**
       * Tag
       */

      if (activeTag) {
        result = result.filter((question) =>
          question.tags.includes(activeTag)
        );
      }

      /**
       * Sort / Filter
       */

      switch (activeFilter) {
        case "Most Answered":
          return result.sort((a, b) => {
            const aCount =
              answers.filter(
                (answer) =>
                  answer.questionId === a.id
              ).length;

            const bCount =
              answers.filter(
                (answer) =>
                  answer.questionId === b.id
              ).length;

            return bCount - aCount;
          });

        case "Unanswered":
          return result.filter(
            (question) =>
              !answers.some(
                (answer) =>
                  answer.questionId ===
                  question.id
              )
          );

        case "Latest":
        default:
          return result.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ).getTime() -
              new Date(
                a.createdAt
              ).getTime()
          );
      }
    }, [
      questions,
      answers,
      searchQuery,
      activeFilter,
      activeTag,
    ]);

  const clearSearch = () =>
    setSearchQuery("");

  const clearTag = () =>
    setActiveTag("");

  const resetFilters = () => {
    setSearchQuery("");
    setActiveTag("");
    setActiveFilter("Latest");
  };

  return {
    searchQuery,
    activeFilter,
    activeTag,
    tags,
    filteredQuestions,

    setSearchQuery,
    setActiveFilter,
    setActiveTag,

    clearSearch,
    clearTag,
    resetFilters,
  };
}