// AuthInput.tsx
import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function AuthInput({
  label,
  error,
  ...props
}: AuthInputProps) {
  return (
    <View className="mb-5">

      <Text className="mb-2 text-sm font-semibold text-foreground">
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor="#9CA3AF"
        className={`
          rounded-2xl
          border
          border-border
          bg-card
          px-4
          py-4
          text-base
          text-foreground
        `}
      />

      {!!error && (
        <Text className="mt-2 text-sm text-red-500">
          {error}
        </Text>
      )}

    </View>
  );
}