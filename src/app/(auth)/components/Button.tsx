import {
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";

interface ButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onPress(): void;
}

export function Button({
  title,
  loading = false,
  disabled = false,
  className = "",
  onPress,
}: ButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      className={`
        h-14
        rounded-2xl
        bg-primary
        items-center
        justify-center
        active:opacity-90
        ${isDisabled ? "opacity-60" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-lg font-bold text-white">
          {title}
        </Text>
      )}
    </Pressable>
  );
}