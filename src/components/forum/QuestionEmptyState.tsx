import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface QuestionEmptyStateProps {
  title?: string;
  description?: string;
}

export function QuestionEmptyState({
  title = "No Questions Yet",
  description = "Be the first to ask a question and start the discussion.",
}: QuestionEmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">

      <View className="h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Feather
          name="message-circle"
          size={36}
          color="#9CA3AF"
        />
      </View>

      <Text className="mt-5 text-xl font-bold text-foreground">
        {title}
      </Text>

      <Text className="mt-3 text-center leading-6 text-muted-foreground">
        {description}
      </Text>

    </View>
  );
}