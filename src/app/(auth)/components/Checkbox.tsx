// Checkbox.tsx
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface CheckboxProps {
  checked: boolean;
  onChange(): void;
}

export function Checkbox({
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <Pressable
      onPress={onChange}
      className={`
        h-6
        w-6
        items-center
        justify-center
        rounded-md
        border
        ${
          checked
            ? "border-primary bg-primary"
            : "border-border bg-white"
        }
      `}
    >
      {checked && (
        <Feather
          name="check"
          size={15}
          color="#FFFFFF"
        />
      )}
    </Pressable>
  );
}