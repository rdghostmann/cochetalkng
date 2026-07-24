// src/store/forum.store.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";



import { extractQuestionTags, filterQuestions } from "@/utils/forum";
import { SEED_ANSWERS, SEED_QUESTIONS } from "../../data/mockdata";
import { QuestionPayload, ForumAnswer, ForumFilter, ForumQuestion, UserProfile, UserSummary } from "@/types/types";


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

  answers: ForumAnswer[];

  currentUser: UserSummary | null;

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
    answers: ForumAnswer[]
  ) => void;

  setCurrentUser: (
    user: UserProfile | null
  ) => void;

  setCMSConfig: (
    config: CMSConfig
  ) => void;

  askQuestion: (
    payload: QuestionPayload
  ) => void;

  addAnswer: (
    answer: ForumAnswer
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

const initialQuestions = SEED_QUESTIONS;
const initialAnswers = SEED_ANSWERS;

const initialState = {
  questions: initialQuestions,
  answers: initialAnswers,

  loading: false,

  currentUser: null,

  cmsConfig: defaultCMS,

  searchQuery: "",

  showSearch: false,

  activeFilter: "Latest" as ForumFilter,

  activeTag: "",

  showAskModal: false,

  filteredQuestions: filterQuestions({
    questions: initialQuestions,
    answers: initialAnswers,
    filter: "Latest",
    tag: "",
    search: "",
  }),

  tags: extractQuestionTags(initialQuestions),
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

        askQuestion: (payload) => {
          const user = get().currentUser;

          if (!user) return;

          const question: ForumQuestion = {
            id: crypto.randomUUID(),

            userId: user.id,

            title: payload.title,

            description: payload.description,

            authorEmail: user.email,

            authorName: user.full_name,

            authorAvatar: user.avatar_url ?? "",

            authorRole: user.role,

            authorVerified: user.isVerified,

            vehicleInfo:
              payload.vehicleInfo ?? {
                make: "",
                model: "",
                year: new Date().getFullYear(),
              },
            tags:
              payload.tags.length > 0
                ? payload.tags
                : ["General"],

            isPrivateEcosystem:
              payload.isPrivateEcosystem,

            upvotes: 0,

            upvotedBy: [],

            answersCount: 0,

            createdAt:
              new Date().toISOString(),

            views: 0,
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