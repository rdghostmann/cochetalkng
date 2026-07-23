// hooks/useForumFilters.ts

import { useMemo, useState } from "react";

import type { ForumQuestion } from "@/types/forum";

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
   * -----------------------------------
   * Extract Tags
   * -----------------------------------
   */

  const tags = useMemo(() => {
    const tagSet =
      new Set<string>();

    questions.forEach(
      (question) => {
        question.tags
          ?.split(",")
          .map((tag) =>
            tag.trim()
          )
          .filter(Boolean)
          .forEach((tag) =>
            tagSet.add(tag)
          );
      }
    );

    return Array.from(tagSet).sort();
  }, [questions]);

  /**
   * -----------------------------------
   * Filter Questions
   * -----------------------------------
   */

  const filteredQuestions =
    useMemo(() => {
      let result = [
        ...questions,
      ];

      /**
       * Search
       */

      if (
        searchQuery.trim()
      ) {
        const keyword =
          searchQuery.toLowerCase();

        result =
          result.filter(
            (question) =>
              question.title
                .toLowerCase()
                .includes(
                  keyword
                ) ||
              question.description
                .toLowerCase()
                .includes(
                  keyword
                ) ||
              question.tags
                ?.toLowerCase()
                .includes(
                  keyword
                ) ||
              question.yrModel
                ?.toLowerCase()
                .includes(
                  keyword
                )
          );
      }

      /**
       * Tag
       */

      if (activeTag) {
        result =
          result.filter(
            (question) =>
              question.tags
                ?.split(",")
                .map((t) =>
                  t.trim()
                )
                .includes(
                  activeTag
                )
          );
      }

      /**
       * Filter
       */

      switch (
        activeFilter
      ) {
        case "Most Answered":
          return result.sort(
            (a, b) => {
              const aCount =
                answers.filter(
                  (
                    answer
                  ) =>
                    answer.questionId ===
                    a.id
                ).length;

              const bCount =
                answers.filter(
                  (
                    answer
                  ) =>
                    answer.questionId ===
                    b.id
                ).length;

              return (
                bCount -
                aCount
              );
            }
          );

        case "Unanswered":
          return result.filter(
            (question) =>
              !answers.some(
                (
                  answer
                ) =>
                  answer.questionId ===
                  question.id
              )
          );

        case "Latest":
        default:
          return result.sort(
            (a, b) =>
              b.timestamp -
              a.timestamp
          );
      }
    }, [
      questions,
      answers,
      searchQuery,
      activeFilter,
      activeTag,
    ]);

  /**
   * -----------------------------------
   * Helpers
   * -----------------------------------
   */

  const clearSearch =
    () => {
      setSearchQuery("");
    };

  const clearTag =
    () => {
      setActiveTag("");
    };

  const resetFilters =
    () => {
      setSearchQuery("");
      setActiveTag("");
      setActiveFilter(
        "Latest"
      );
    };

  return {
    /**
     * State
     */

    searchQuery,

    activeFilter,

    activeTag,

    tags,

    filteredQuestions,

    /**
     * Actions
     */

    setSearchQuery,

    setActiveFilter,

    setActiveTag,

    clearSearch,

    clearTag,

    resetFilters,
  };
}