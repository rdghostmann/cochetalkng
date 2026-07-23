// components/forum/RatingModal.tsx

import { Feather } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { StarRating } from "./StarRating";

interface RatingModalProps {
  visible: boolean;

  sellerName: string;

  rating: number;

  feedback: string;

  loading?: boolean;

  onRatingChange: (
    rating: number
  ) => void;

  onFeedbackChange: (
    text: string
  ) => void;

  onSubmit: () => void;

  onClose: () => void;
}

export function RatingModal({
  visible,
  sellerName,
  rating,
  feedback,
  loading = false,
  onRatingChange,
  onFeedbackChange,
  onSubmit,
  onClose,
}: RatingModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Overlay */}

      <Pressable
        onPress={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Bottom Sheet */}

      <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-background">

        {/* Handle */}

        <View className="items-center py-3">

          <View className="h-1.5 w-12 rounded-full bg-border" />

        </View>

        {/* Header */}

        <View className="flex-row items-center justify-between border-b border-border px-6 pb-4">

          <Text className="text-xl font-bold text-foreground">
            Rate {sellerName}
          </Text>

          <Pressable onPress={onClose}>
            <Feather
              name="x"
              size={22}
              color="#6B7280"
            />
          </Pressable>

        </View>

        {/* Content */}

        <View className="px-6 py-5">

          <Text className="mb-3 text-sm font-semibold text-foreground">
            Your Rating
          </Text>

          <View className="mb-6 flex-row items-center">

            <StarRating
              value={rating}
              interactive
              size={34}
              onSelect={onRatingChange}
            />

            <Text className="ml-4 text-lg font-bold text-primary">
              {rating}/5
            </Text>

          </View>

          <Text className="mb-3 text-sm font-semibold text-foreground">
            Feedback
          </Text>

          <TextInput
            multiline
            numberOfLines={5}
            value={feedback}
            onChangeText={onFeedbackChange}
            placeholder="Tell others about your experience..."
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
            className="min-h-[120px] rounded-2xl border border-border bg-card p-4 text-base text-foreground"
          />

          <Pressable
            disabled={
              loading ||
              !feedback.trim()
            }
            onPress={onSubmit}
            className={`mt-6 items-center rounded-2xl py-4 ${
              loading ||
              !feedback.trim()
                ? "bg-muted"
                : "bg-primary"
            }`}
          >
            <Text
              className={`text-base font-bold ${
                loading ||
                !feedback.trim()
                  ? "text-muted-foreground"
                  : "text-primary-foreground"
              }`}
            >
              {loading
                ? "Submitting..."
                : "Submit Review"}
            </Text>

          </Pressable>

        </View>

      </View>

    </Modal>
  );
}