import { View, Text } from "react-native";

interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({
  text = "or continue with",
}: AuthDividerProps) {
  return (
    <View className="my-6 flex-row items-center">

      <View className="h-px flex-1 bg-border" />

      <Text className="mx-4 text-sm text-muted-foreground">
        {text}
      </Text>

      <View className="h-px flex-1 bg-border" />

    </View>
  );
}