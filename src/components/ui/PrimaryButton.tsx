// src/components/ui/PrimaryButton.tsx

import {
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";

interface PrimaryButtonProps {
  title: string;

  loading?: boolean;

  disabled?: boolean;

  className?: string;

  onPress(): void;
}

export function PrimaryButton({
  title,
  loading = false,
  disabled = false,
  className = "",
  onPress,
}: PrimaryButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      className={`
        h-14
        items-center
        justify-center
        rounded-2xl
        bg-primary
        ${isDisabled ? "opacity-60" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-base font-bold text-primary-foreground">
          {title}
        </Text>
      )}
    </Pressable>
  );
}