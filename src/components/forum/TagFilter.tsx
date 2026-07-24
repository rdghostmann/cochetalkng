// components/forum/TagFilter.tsx

import { Pressable, ScrollView, Text } from "react-native";

interface TagFilterProps {
  tags: string[];
  active?: string;
  onChange: (tag: string) => void;
}

export function TagFilter({
  tags,
  active,
  onChange,
}: TagFilterProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 py-3"
    >
      {/* All Tags */}
      <Pressable
        onPress={() => onChange("")}
        className={`mr-2 rounded-xl border px-4 py-2 ${
          !active
            ? "border-foreground bg-foreground"
            : "border-border bg-card"
        }`}
      >
        <Text
          className={`text-xs font-bold ${
            !active
              ? "text-background"
              : "text-muted-foreground"
          }`}
        >
          All Tags
        </Text>
      </Pressable>

      {tags.map((tag) => {
        const selected = active === tag;

        return (
          <Pressable
            key={tag}
            onPress={() =>
              onChange(selected ? "" : tag)
            }
            className={`mr-2 rounded-md border px-4 py-2 ${
              selected
                ? "border-primary bg-primary"
                : "border-border bg-card"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                selected
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              #{tag}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}