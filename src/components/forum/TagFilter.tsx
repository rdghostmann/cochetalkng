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
  if (!tags.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 py-3"
    >
      {/* All Tags */}

      <Pressable
        onPress={() => onChange("")}
        className={`mr-2 rounded-full border px-4 py-2 ${
          !active
            ? "border-primary bg-primary"
            : "border-foreground bg-foreground"
        }`}
      >
        <Text className="text-xs font-semibold text-white">
          All Tags
        </Text>
      </Pressable>

      {tags.map((tag) => {
        const selected = active === tag;

        return (
          <Pressable
            key={tag}
            onPress={() => onChange(selected ? "" : tag)}
            className={`mr-2  border px-4 py-2 ${
              selected
                ? "border-primary bg-primary"
                : "border-foreground bg-foreground"
            }`}
          >
            <Text className="text-xs font-semibold text-white">
              {tag}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}