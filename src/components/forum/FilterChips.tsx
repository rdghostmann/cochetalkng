import { Pressable, ScrollView, Text } from "react-native";

interface Props {
  value: string;
  onChange(value: string): void;
}

const FILTERS = [
  "Latest",
  "Most Answered",
  "Unanswered",
];

export function FilterChips({
  value,
  onChange,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 py-3"
    >
      {FILTERS.map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          className={`mr-2 rounded-full border px-4 py-2 ${
            value === item
              ? "border-pro-circle bg-pro-circle"
              : "border-border bg-muted"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              value === item
                ? "text-white"
                : "text-muted-foreground"
            }`}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}