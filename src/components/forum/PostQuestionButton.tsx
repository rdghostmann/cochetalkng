// components/forum/PostQuestionButton.tsx

import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

interface Props {
  onPress(): void;
}

export function PostQuestionButton({
  onPress,
}: Props) {
  return (
    <View className="absolute bottom-24 right-5 z-50">

      <Pressable
        onPress={onPress}
        android_ripple={{
          color: "#00D8AB",
          borderless: true,
          radius: 34,
        }}
        className="h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg"
        style={{
          elevation: 8,
          shadowColor: "#00EBBA",
          shadowOpacity: 0.35,
          shadowRadius: 16,
          shadowOffset: {
            width: 0,
            height: 8,
          },
        }}
      >
        <Feather
          name="plus"
          size={30}
          color="#000"
        />
      </Pressable>

    </View>
  );
}