// components/forum/FilterChips.tsx

import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { FORUM_FILTERS } from "@/constants/forum";
import type { ForumFilter } from "@/types/types";

interface Props {
  active: ForumFilter;
  onChange: (
    filter: ForumFilter
  ) => void;
}

export function FilterChips({
  active,
  onChange,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 py-3"
    >
      <View className="flex-row rounded-2xl bg-muted p-1">
        {FORUM_FILTERS.map((filter) => {
          const selected =
            active === filter;

          return (
            <Pressable
              key={filter}
              onPress={() =>
                onChange(filter)
              }
              className={`mx-0.5 min-w-[110px] items-center rounded-xl px-4 py-2.5 ${
                selected
                  ? "bg-background shadow-sm"
                  : ""
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selected
                    ? filter ===
                      "Solved"
                      ? "text-emerald-600"
                      : "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}