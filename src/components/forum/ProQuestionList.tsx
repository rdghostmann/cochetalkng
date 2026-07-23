import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { Href, router } from "expo-router";
import { QuestionCard } from "../ui/QuestionCard";


type Props = {
  questions: any[];
  answers: any[];
  ListEmptyComponent?: React.ReactElement;
};

export function ProQuestionList({
  questions,
  answers,
  ListEmptyComponent,
}: Props) {
  const answerMap = useMemo(() => {
    const map = new Map<string, number>();

    answers.forEach((answer) => {
      map.set(
        answer.questionId,
        (map.get(answer.questionId) ?? 0) + 1
      );
    });

    return map;
  }, [answers]);

  return (
    <FlatList
      data={questions}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-28 pt-2"
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => (
        <QuestionCard
          question={item}
          isProCircle
          answerCount={
            answerMap.get(item.id) ?? 0
          }
          onUserPress={() =>
            router.push(
              `/seller/${encodeURIComponent(
                item.userId
              )}` as Href
            )
          }
        />
      )}
    />
  );
}