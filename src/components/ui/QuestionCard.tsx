import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, Href } from "expo-router";

import { Question } from "@/types/forum.types";

interface QuestionCardProps {
  question: Question;
  answerCount: number;
  isProCircle?: boolean;
  onPress?: () => void;
  onUserPress?: () => void;
}

function timeAgo(date: string) {
  const timestamp = new Date(date).getTime();
  const diff = Date.now() - timestamp;

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < minute) return "Just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;

  return `${Math.floor(diff / day)}d ago`;
}

function QuestionCardComponent({
  question,
  answerCount,
  isProCircle = false,
  onPress,
  onUserPress,
}: QuestionCardProps) {
  const concerns: string[] = [];

  if (question.concerns?.see) concerns.push("See");
  if (question.concerns?.hear) concerns.push("Hear");
  if (question.concerns?.smell) concerns.push("Smell");
  if (question.concerns?.feel) concerns.push("Feel");
  if (question.concerns?.notStarting) concerns.push("No Start");
  if (question.concerns?.performance) concerns.push("Performance");
  if (question.concerns?.dashboardWarningLights)
    concerns.push("Dash Lights");

  return (
    <Pressable
      onPress={
        onPress ??
        (() => router.push(`/question/${question.id}` as Href))
      }
      className="mx-4 my-2 rounded-2xl border border-border bg-card p-4"
    >
      {isProCircle && (
        <View className="mb-3 flex-row self-start items-center rounded-full border border-pro-circle bg-pro-circle/10 px-3 py-1">
          <Feather
            name="lock"
            size={12}
            color="#A78BFA"
          />

          <Text className="ml-1 text-xs font-semibold text-pro-circle">
            Pro Circle
          </Text>
        </View>
      )}

      <Text
        numberOfLines={2}
        className="text-base font-bold text-card-foreground"
      >
        {question.title}
      </Text>

      {!!question.vehicle?.yearModel && (
        <Text className="mt-1 text-xs text-muted-foreground">
          {question.vehicle.yearModel}
        </Text>
      )}

      {question.tags.length > 0 && (
        <View className="mt-3 flex-row flex-wrap">
          {question.tags.map((tag) => (
            <View
              key={tag}
              className="mr-2 mb-2 rounded-full bg-muted px-3 py-1"
            >
              <Text className="text-xs font-medium text-primary">
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}

      {concerns.length > 0 && (
        <View className="mt-1 flex-row flex-wrap">
          {concerns.map((item) => (
            <View
              key={item}
              className="mr-2 mb-2 rounded-full border border-warning bg-warning/10 px-3 py-1"
            >
              <Text className="text-xs font-medium text-warning">
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View className="mt-4 flex-row items-center justify-between">
        <Pressable
          onPress={onUserPress}
          disabled={!onUserPress}
          className="flex-1 flex-row items-center"
        >
          <View className="h-9 w-9 items-center justify-center rounded-full bg-primary/15">
            <Text className="font-bold text-primary">
              {question.author.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View className="ml-3">
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-foreground">
                {question.author.name}
              </Text>

              {question.author.verified && (
                <Feather
                  name="check-circle"
                  size={13}
                  color="#00EBBA"
                  style={{ marginLeft: 4 }}
                />
              )}
            </View>

            <Text className="text-xs text-muted-foreground">
              {question.author.specialization ??
                question.author.role}
            </Text>
          </View>
        </Pressable>

        <View className="flex-row items-center">
          <View className="mr-4 flex-row items-center">
            <Feather
              name="arrow-up"
              size={14}
              color="#6B7280"
            />

            <Text className="ml-1 text-xs text-muted-foreground">
              {question.upvotes}
            </Text>
          </View>

          <View className="mr-4 flex-row items-center">
            <Feather
              name="message-square"
              size={14}
              color="#6B7280"
            />

            <Text className="ml-1 text-xs text-muted-foreground">
              {answerCount}
            </Text>
          </View>

          {question.acceptedAnswerId && (
            <Feather
              name="check-circle"
              size={15}
              color="#10B981"
            />
          )}

          <Text className="ml-3 text-xs text-muted-foreground">
            {timeAgo(question.createdAt)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export const QuestionCard = memo(QuestionCardComponent);