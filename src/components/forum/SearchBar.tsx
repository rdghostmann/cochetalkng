// components/forum/SearchBar.tsx

import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  TextInput,
  View,
} from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search questions...",
  autoFocus = true,
}: SearchBarProps) {
  return (
    <View className="mx-4 mt-3 flex-row items-center rounded-xl border border-border bg-muted px-4 py-3">

      <Feather
        name="search"
        size={18}
        color="#6B7280"
      />

      <TextInput
        className="ml-3 flex-1 text-base text-foreground"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {value.length > 0 && (
        <Pressable
          hitSlop={10}
          onPress={() => onChangeText("")}
        >
          <Feather
            name="x-circle"
            size={18}
            color="#9CA3AF"
          />
        </Pressable>
      )}

    </View>
  );
}