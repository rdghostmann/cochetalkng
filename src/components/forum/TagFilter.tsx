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
      className="mt-3"
      contentContainerClassName="px-4"
    >
      {tags.map((tag) => {
        const selected = active === tag;

        return (
          <Pressable
            key={tag}
            onPress={() =>
              onChange(selected ? "" : tag)
            }
            className={`mr-2 rounded-full border px-4 py-2 ${
              selected
                ? "border-primary bg-primary"
                : "border-border bg-card"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
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