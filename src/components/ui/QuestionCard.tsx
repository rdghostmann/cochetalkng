// components/ui/QuestionCard.tsx

import { memo } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Href, router } from "expo-router";

import type { ForumQuestion } from "@/types/types";

interface QuestionCardProps {
  question: ForumQuestion;
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

function Stat({
  icon,
  value,
}: {
  icon: keyof typeof Feather.glyphMap;
  value: number;
}) {
  return (
    <View className="mr-8 flex-row items-center">
      <Feather
        name={icon}
        size={20}
        color="#64748B"
      />

      <Text className="ml-2 text-sm font-medium text-muted-foreground">
        {value}
      </Text>
    </View>
  );
}

function QuestionCardComponent({
  question,
  answerCount,
  onPress,
  onUserPress,
}: QuestionCardProps) {
  const vehicle = [
    question.vehicleInfo?.make,
    question.vehicleInfo?.model,
    question.vehicleInfo?.year,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Pressable
      onPress={
        onPress ??
        (() =>
          router.push(
            `/question/${question.id}` as Href
          ))
      }
      className="mx-4 my-2 rounded-3xl border border-border bg-card px-5 py-5"
    >
      {/* ================= Header ================= */}

      <View className="flex-row items-start justify-between">

        <Pressable
          onPress={onUserPress}
          className="flex-1 flex-row"
        >
          {/* Avatar */}

          {question.authorAvatar ? (
            <Image
              source={{
                uri: question.authorAvatar,
              }}
              className="h-14 w-14 rounded-full"
            />
          ) : (
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/15">
              <Text className="text-xl font-bold text-primary">
                {question.authorName
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>
          )}

          <View className="ml-4 flex-1">

            {/* Name */}

            <View className="flex-row items-center">

              <Text className="text-xl font-bold text-foreground">
                {question.authorName}
              </Text>

              {question.authorVerified && (
                <View className="ml-3 flex-row items-center rounded-full bg-primary/10 px-3 py-1">

                  <Feather
                    name="check-circle"
                    size={14}
                    color="#00C787"
                  />

                  <Text className="ml-1 text-xs font-bold text-primary">
                    Verified
                  </Text>

                </View>
              )}

            </View>

            {/* Vehicle */}

            <Text className="mt-2 text-base text-muted-foreground">

              {vehicle}

              {question.tags[0] &&
                ` • ${question.tags[0]}`}

            </Text>

          </View>

        </Pressable>

        <Text className="text-sm text-muted-foreground">
          {timeAgo(question.createdAt)}
        </Text>

      </View>

      {/* ================= Question ================= */}

      <Text
        numberOfLines={3}
        className="mt-6 text-3xl font-bold leading-10 text-foreground"
      >
        {question.title}
      </Text>

      {/* ================= Tag ================= */}

      {question.tags.length > 0 && (
        <View className="mt-6 flex-row flex-wrap">

          <View className="rounded-full bg-primary/10 px-4 py-2">

            <Text className="text-base font-semibold text-primary">
              {question.tags[0]}
            </Text>

          </View>

        </View>
      )}

      {/* ================= Footer ================= */}

      <View className="mt-8 flex-row items-center justify-between">

        {/* Stats */}

        <View className="flex-row items-center">

          <Stat
            icon="arrow-up"
            value={question.upvotes}
          />

          <Stat
            icon="message-square"
            value={answerCount}
          />

          <Stat
            icon="eye"
            value={
              question.views ??
              0
            }
          />

        </View>

        {/* Actions */}

        <View className="flex-row items-center">

          <Pressable className="mr-5">

            <Feather
              name="bookmark"
              size={24}
              color="#475569"
            />

          </Pressable>

          <Pressable>

            <Feather
              name="more-vertical"
              size={24}
              color="#475569"
            />

          </Pressable>

        </View>

      </View>

    </Pressable>
  );
}

export const QuestionCard = memo(
  QuestionCardComponent
);