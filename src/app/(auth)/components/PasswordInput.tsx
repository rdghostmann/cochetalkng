import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface PasswordInputProps
  extends TextInputProps {
  label: string;
  error?: string;
}

export function PasswordInput({
  label,
  error,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="mb-5">

      <Text className="mb-2 text-sm font-semibold text-foreground">
        {label}
      </Text>

      <View className="flex-row items-center rounded-2xl border border-border bg-card px-4">

        <TextInput
          {...props}
          secureTextEntry={!visible}
          placeholderTextColor="#9CA3AF"
          className="flex-1 py-4 text-base text-foreground"
        />

        <Pressable
          onPress={() => setVisible(!visible)}
          hitSlop={10}
        >
          <Feather
            name={visible ? "eye-off" : "eye"}
            size={20}
            color="#6B7280"
          />
        </Pressable>

      </View>

      {!!error && (
        <Text className="mt-2 text-sm text-red-500">
          {error}
        </Text>
      )}

    </View>
  );
}