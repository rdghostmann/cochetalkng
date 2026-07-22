import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface Props {
  onPress(): void;
}

export function FloatingAskButton({
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-24 right-5 h-14 w-14 items-center justify-center rounded-full bg-pro-circle shadow-lg"
    >
      <Feather
        name="plus"
        size={24}
        color="white"
      />
    </Pressable>
  );
}