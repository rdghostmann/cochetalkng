// components/forum/QuestionFeed.tsx
import { Href, router } from "expo-router";
import { FlatList } from "react-native";

import { QuestionCard } from "../ui/QuestionCard";
import { QuestionEmptyState } from "./QuestionEmptyState";

import type {
  ForumQuestion,
  ForumAnswer,
} from "@/types/types";

interface QuestionFeedProps {
  questions: ForumQuestion[];

  answers: ForumAnswer[];
}

export function QuestionFeed({
  questions,
  answers,
}: QuestionFeedProps) {
  return (
    <FlatList
      data={questions}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="py-4"
      ListEmptyComponent={<QuestionEmptyState />}
      renderItem={({ item }) => (
        <QuestionCard
          question={item}
          answerCount={
            answers.filter(
              (answer) =>
                answer.questionId === item.id
            ).length
          }
          onUserPress={() =>
            router.push(
              `/(protected)/seller/${item.userId}` as Href
            )
          }
        />
      )}
    />
  );
}