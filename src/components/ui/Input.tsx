// Input.tsx

import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: keyof typeof Feather.glyphMap;
}

export function Input({
  label,
  error,
  icon,
  ...props
}: InputProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-[15px] font-semibold text-foreground">
        {label}
      </Text>

      <View className="h-14 flex-row items-center rounded-2xl border border-border bg-white px-4">
        {icon && (
          <Feather
            name={icon}
            size={20}
            color="#10B981"
          />
        )}

        <TextInput
          {...props}
          placeholderTextColor="#9CA3AF"
          className="ml-3 flex-1 text-base text-foreground"
        />
      </View>

      {!!error && (
        <Text className="mt-2 text-sm text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
}