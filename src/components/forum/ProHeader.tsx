import { Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface ProHeaderProps {
  title?: string;
}

export function ProHeader({
  title = "Pro Circle",
}: ProHeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">

      <View className="flex-row items-center">

        <Feather
          name="lock"
          size={18}
          color="#A78BFA"
        />

        <Text className="ml-2 text-xl font-bold text-foreground">
          {title}
        </Text>

      </View>

      <View className="rounded-full bg-pro-circle/10 px-3 py-1">

        <Text className="text-xs font-semibold text-pro-circle">
          Mechanics Only
        </Text>

      </View>

    </View>
  );
}