// hooks/useForum.ts

import { useForumStore } from "@/store/forum.store";
import { useMemo } from "react";


export function useForum() {
  const questions = useForumStore(
    (state) => state.questions
  );

  const answers = useForumStore(
    (state) => state.answers
  );

  const isLoading = useForumStore(
    (state) => state.isLoading
  );

  const askQuestion = useForumStore(
    (state) => state.askQuestion
  );

  const addAnswer = useForumStore(
    (state) => state.addAnswer
  );

  const updateQuestion = useForumStore(
    (state) => state.updateQuestion
  );

  const deleteQuestion = useForumStore(
    (state) => state.deleteQuestion
  );

  /**
   * Public Questions
   */

  const publicQuestions =
    useMemo(() => {
      return questions.filter(
        (question) =>
          !question.isPrivateEcosystem
      );
    }, [questions]);

  /**
   * Pro Circle Questions
   */

  const proQuestions =
    useMemo(() => {
      return questions.filter(
        (question) =>
          question.isPrivateEcosystem
      );
    }, [questions]);

  /**
   * Latest Questions
   */

  const latestQuestions =
    useMemo(() => {
      return [...questions].sort(
        (a, b) =>
          b.timestamp -
          a.timestamp
      );
    }, [questions]);

  /**
   * Unanswered Questions
   */

  const unansweredQuestions =
    useMemo(() => {
      return questions.filter(
        (question) =>
          !answers.some(
            (answer) =>
              answer.questionId ===
              question.id
          )
      );
    }, [questions, answers]);

  /**
   * Most Answered
   */

  const mostAnsweredQuestions =
    useMemo(() => {
      return [...questions].sort(
        (a, b) =>
          answers.filter(
            (answer) =>
              answer.questionId ===
              b.id
          ).length -
          answers.filter(
            (answer) =>
              answer.questionId ===
              a.id
          ).length
      );
    }, [questions, answers]);

  /**
   * Statistics
   */

  const totalQuestions =
    questions.length;

  const totalAnswers =
    answers.length;

  const totalPublicQuestions =
    publicQuestions.length;

  const totalPrivateQuestions =
    proQuestions.length;

  return {
    isLoading,

    questions,

    answers,

    publicQuestions,

    proQuestions,

    latestQuestions,

    unansweredQuestions,

    mostAnsweredQuestions,

    totalQuestions,

    totalAnswers,

    totalPublicQuestions,

    totalPrivateQuestions,

    askQuestion,

    addAnswer,

    updateQuestion,

    deleteQuestion,
  };
}