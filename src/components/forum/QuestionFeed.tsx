// components/forum/QuestionFeed.tsx
import { Href, router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

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
    <>
      <View className="mt-6 mb-2 flex-row items-center justify-between px-4">

        <Text className="text-xl font-bold text-background">
          Top Questions
        </Text>

        <Pressable>

          <Text className="font-semibold text-primary">
            See all
          </Text>

        </Pressable>

      </View>

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
    </>

  );
}