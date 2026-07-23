// components/forum/FilterChips.tsx
import { Pressable, ScrollView, Text } from "react-native";

import { FORUM_FILTERS } from "@/constants/forum";
import type { ForumFilter } from "@/types/forum.types";

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
      {FORUM_FILTERS.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => onChange(filter)}
          className={`mr-2 rounded-full border px-4 py-2 ${
            active === filter
              ? "border-pro-circle bg-pro-circle"
              : "border-border bg-muted"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              active === filter
                ? "text-white"
                : "text-muted-foreground"
            }`}
          >
            {filter}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}