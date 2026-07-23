// components/forum/QuestionFeed.tsx
import { Href, router } from "expo-router";
import { FlatList } from "react-native";

import { QuestionCard } from "../ui/QuestionCard";
import { QuestionEmptyState } from "./QuestionEmptyState";

import type {
  ForumQuestion,
  Answer,
} from "@/types/forum.types";

interface QuestionFeedProps {
  questions: ForumQuestion[];

  answers: Answer[];
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
      contentContainerClassName="px-4 pt-3 pb-36"
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
            router.push({
              pathname: "/seller/[id]",
              params: {
                id: item.userId,
              },
            } as Href)
          }
        />
      )}
    />
  );
}