import type {
  ForumAnswer,
  ForumFilter,
  ForumQuestion,
} from "@/types/types";

/* -------------------------------------------------------------------------- */
/*                                  Sorting                                   */
/* -------------------------------------------------------------------------- */

export function sortLatest(
  questions: ForumQuestion[]
): ForumQuestion[] {
  return [...questions].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

export function sortMostAnswered(
  questions: ForumQuestion[],
  answers: ForumAnswer[]
): ForumQuestion[] {
  return [...questions].sort(
    (a, b) =>
      getAnswerCount(b.id, answers) -
      getAnswerCount(a.id, answers)
  );
}

export function getUnansweredQuestions(
  questions: ForumQuestion[],
  answers: ForumAnswer[]
): ForumQuestion[] {
  return questions.filter(
    (question) =>
      !answers.some(
        (answer) =>
          answer.questionId === question.id
      )
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Search                                    */
/* -------------------------------------------------------------------------- */

export function searchQuestions(
  questions: ForumQuestion[],
  keyword: string
): ForumQuestion[] {
  if (!keyword.trim()) {
    return questions;
  }

  const search = keyword.toLowerCase();

  return questions.filter((question) => {
    const vehicle = question.vehicleInfo;

    return (
      question.title
        .toLowerCase()
        .includes(search) ||
      question.description
        .toLowerCase()
        .includes(search) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(search)
      ) ||
      vehicle?.make
        ?.toLowerCase()
        .includes(search) ||
      vehicle?.model
        ?.toLowerCase()
        .includes(search) ||
      vehicle?.type
        ?.toLowerCase()
        .includes(search) ||
      vehicle?.year
        ?.toString()
        .includes(search)
    );
  });
}

/* -------------------------------------------------------------------------- */
/*                                   Tags                                     */
/* -------------------------------------------------------------------------- */

export function filterByTag(
  questions: ForumQuestion[],
  tag: string
): ForumQuestion[] {
  if (!tag) {
    return questions;
  }

  return questions.filter((question) =>
    question.tags.includes(tag)
  );
}

export function extractTags(
  questions: ForumQuestion[]
): string[] {
  const tagSet = new Set<string>();

  questions.forEach((question) => {
    question.tags.forEach((tag) => {
      const value = tag.trim();

      if (value) {
        tagSet.add(value);
      }
    });
  });

  return [...tagSet].sort();
}

/**
 * Alias used by Forum Store
 */
export const extractQuestionTags =
  extractTags;

/* -------------------------------------------------------------------------- */
/*                             Combined Filtering                             */
/* -------------------------------------------------------------------------- */

interface FilterQuestionOptions {
  questions: ForumQuestion[];
  answers: ForumAnswer[];
  filter: ForumFilter;
  tag?: string;
  search?: string;
}

export function filterQuestions({
  questions,
  answers,
  filter,
  tag = "",
  search = "",
}: FilterQuestionOptions): ForumQuestion[] {
  let result = [...questions];

  result = searchQuestions(
    result,
    search
  );

  result = filterByTag(
    result,
    tag
  );

  switch (filter) {
    case "Most Answered":
      return sortMostAnswered(
        result,
        answers
      );

    case "Unanswered":
      return getUnansweredQuestions(
        result,
        answers
      );

    case "Latest":
    default:
      return sortLatest(result);
  }
}

/* -------------------------------------------------------------------------- */
/*                                Statistics                                  */
/* -------------------------------------------------------------------------- */

export function getAnswerCount(
  questionId: string,
  answers: ForumAnswer[]
): number {
  return answers.filter(
    (answer) =>
      answer.questionId === questionId
  ).length;
}

export function hasAcceptedAnswer(
  question: ForumQuestion
): boolean {
  return Boolean(
    question.acceptedAnswerId
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Formatting                                 */
/* -------------------------------------------------------------------------- */

export function formatRelativeTime(
  createdAt: string
): string {
  const seconds = Math.floor(
    (Date.now() -
      new Date(createdAt).getTime()) /
      1000
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(
    days / 30
  );

  if (months < 12) {
    return `${months}mo ago`;
  }

  const years = Math.floor(
    months / 12
  );

  return `${years}y ago`;
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

export function getInitial(
  name: string
): string {
  return name
    .trim()
    .charAt(0)
    .toUpperCase();
}