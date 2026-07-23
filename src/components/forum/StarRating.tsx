// components/seller/StarRating.tsx

import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

interface StarRatingProps {
  value: number;

  max?: number;

  size?: number;

  interactive?: boolean;

  onSelect?: (
    value: number
  ) => void;
}

export function StarRating({
  value,
  max = 5,
  size = 22,
  interactive = false,
  onSelect,
}: StarRatingProps) {
  return (
    <View className="flex-row">

      {Array.from({
        length: max,
      }).map((_, index) => (
        <Pressable
          key={index}
          disabled={!interactive}
          onPress={() =>
            onSelect?.(index + 1)
          }
          className="mr-1"
        >
          <Feather
            name="star"
            size={size}
            color="#F59E0B"
            style={{
              opacity:
                index < value
                  ? 1
                  : 0.25,
            }}
          />
        </Pressable>
      ))}

    </View>
  );
}