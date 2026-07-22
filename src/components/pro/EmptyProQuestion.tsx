import { Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";

export function EmptyProQuestions() {
  return (
    <View className="items-center px-8 py-20">

      <Feather
        name="lock"
        size={44}
        color="#A78BFA"
      />

      <Text className="mt-4 text-lg font-bold text-foreground">
        No Pro Questions Yet
      </Text>

      <Text className="mt-2 text-center text-muted-foreground">
        Be the first mechanic to start a technical discussion.
      </Text>

    </View>
  );
}