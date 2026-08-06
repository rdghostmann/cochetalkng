import { Feather } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

interface Props {
  onPress: () => void;
}

export function FilterButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="h-14 flex-row items-center rounded-2xl bg-primary/10 px-5"
    >
      <Feather
        name="sliders"
        size={18}
        color="#10B981"
      />

      <Text className="ml-2 font-semibold text-primary">
        Filters
      </Text>
    </Pressable>
  );
}