// src/store/forum.store.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type {
  Answer,
  ForumFilter,
  ForumQuestion,
  ForumUser,
  QuestionPayload,
} from "@/types/forum.types";
import { extractQuestionTags, filterQuestions } from "@/utils/forum";


interface CMSConfig {
  forumLogoUri?: string;

  announcementActive: boolean;

  announcementText: string;
}

interface ForumStore {
  /**
   * Data
   */

  questions: ForumQuestion[];

  answers: Answer[];

  currentUser: ForumUser | null;

  cmsConfig: CMSConfig;

  /**
   * Loading
   */

  loading: boolean;

  setLoading: (loading: boolean) => void;

  /**
   * Search
   */

  searchQuery: string;

  showSearch: boolean;

  setSearchQuery: (
    value: string
  ) => void;

  toggleSearch: () => void;

  /**
   * Filters
   */

  activeFilter: ForumFilter;

  activeTag: string;

  setActiveFilter: (
    filter: ForumFilter
  ) => void;

  setActiveTag: (
    tag: string
  ) => void;

  /**
   * Ask Modal
   */

  showAskModal: boolean;

  openAskModal: () => void;

  closeAskModal: () => void;

  /**
   * Actions
   */

  setQuestions: (
    questions: ForumQuestion[]
  ) => void;

  setAnswers: (
    answers: Answer[]
  ) => void;

  setCurrentUser: (
    user: ForumUser | null
  ) => void;

  setCMSConfig: (
    config: CMSConfig
  ) => void;

  askQuestion: (
    payload: QuestionPayload
  ) => void;

  addAnswer: (
    answer: Answer
  ) => void;

  updateQuestion: (
    id: string,
    data: Partial<ForumQuestion>
  ) => void;

  deleteQuestion: (
    id: string
  ) => void;

  reset: () => void;

  /**
   * Selectors
   */

  filteredQuestions: ForumQuestion[];

  tags: string[];

  refreshSelectors: () => void;
}

const defaultCMS: CMSConfig = {
  forumLogoUri: "",

  announcementActive: false,

  announcementText: "",
};

const initialState = {
  questions: [],

  answers: [],

  loading: false,

  currentUser: null,

  cmsConfig: defaultCMS,

  searchQuery: "",

  showSearch: false,

  activeFilter: "Latest" as ForumFilter,

  activeTag: "",

  showAskModal: false,

  filteredQuestions: [],

  tags: [],
};

export const useForumStore =
  create<ForumStore>()(
    devtools(
      (set, get) => ({
        ...initialState,

        setLoading: (
          loading
        ) =>
          set({
            loading,
          }),

        setSearchQuery: (
          searchQuery
        ) => {
          set({
            searchQuery,
          });

          get().refreshSelectors();
        },

        toggleSearch: () =>
          set((state) => ({
            showSearch:
              !state.showSearch,
          })),

        setActiveFilter: (
          activeFilter
        ) => {
          set({
            activeFilter,
          });

          get().refreshSelectors();
        },

        setActiveTag: (
          activeTag
        ) => {
          set({
            activeTag,
          });

          get().refreshSelectors();
        },

        openAskModal: () =>
          set({
            showAskModal: true,
          }),

        closeAskModal: () =>
          set({
            showAskModal: false,
          }),

        setQuestions: (
          questions
        ) => {
          set({
            questions,
          });

          get().refreshSelectors();
        },

        setAnswers: (
          answers
        ) => {
          set({
            answers,
          });

          get().refreshSelectors();
        },

        setCurrentUser: (
          currentUser
        ) =>
          set({
            currentUser,
          }),

        setCMSConfig: (
          cmsConfig
        ) =>
          set({
            cmsConfig,
          }),

        askQuestion: (
          payload
        ) => {
          const question: ForumQuestion =
            {
              id:
                crypto.randomUUID(),

              userId:
                payload.userId,

              title:
                payload.title,

              description:
                payload.description,

              tags: payload.tags,

              yrModel:
                payload.yrModel,

              vehicleType:
                payload.vehicleType,

              isPrivateEcosystem:
                payload.isPrivateEcosystem,

              hearConcern:
                payload.hearConcern,

              seeConcern:
                payload.seeConcern,

              smellConcern:
                payload.smellConcern,

              feelConcern:
                payload.feelConcern,

              notStarting:
                payload.notStarting,

              performanceConcern:
                payload.performanceConcern,

              dashboardWarningLights:
                payload.dashboardWarningLights,

              timestamp:
                Date.now(),
            };

          set((state) => ({
            questions: [
              question,
              ...state.questions,
            ],

            showAskModal: false,
          }));

          get().refreshSelectors();
        },

        addAnswer: (
          answer
        ) => {
          set((state) => ({
            answers: [
              answer,
              ...state.answers,
            ],
          }));

          get().refreshSelectors();
        },

        updateQuestion: (
          id,
          data
        ) => {
          set((state) => ({
            questions:
              state.questions.map(
                (question) =>
                  question.id ===
                  id
                    ? {
                        ...question,
                        ...data,
                      }
                    : question
              ),
          }));

          get().refreshSelectors();
        },

        deleteQuestion: (
          id
        ) => {
          set((state) => ({
            questions:
              state.questions.filter(
                (q) =>
                  q.id !== id
              ),

            answers:
              state.answers.filter(
                (a) =>
                  a.questionId !==
                  id
              ),
          }));

          get().refreshSelectors();
        },

        refreshSelectors: () => {
          const state = get();

          const filtered =
            filterQuestions({
              questions:
                state.questions,
              answers:
                state.answers,
              filter:
                state.activeFilter,
              tag:
                state.activeTag,
              search:
                state.searchQuery,
            });

          const tags =
            extractQuestionTags(
              state.questions
            );

          set({
            filteredQuestions:
              filtered,

            tags,
          });
        },

        reset: () =>
          set(initialState),
      }),
      {
        name:
          "ForumStore",
      }
    )
  );