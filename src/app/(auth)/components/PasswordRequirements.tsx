import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  const rules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Include uppercase and lowercase letters",
      valid:
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password),
    },
    {
      label: "Include a number",
      valid: /\d/.test(password),
    },
  ];

  return (
    <View className="mt-2 mb-6 space-y-2">
      {rules.map((rule) => (
        <View
          key={rule.label}
          className="flex-row items-center"
        >
          <Feather
            name={
              rule.valid
                ? "check-circle"
                : "circle"
            }
            size={18}
            color={
              rule.valid
                ? "#10B981"
                : "#D1D5DB"
            }
          />

          <Text
            className={`
              ml-3
              text-[14px]
              ${
                rule.valid
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            `}
          >
            {rule.label}
          </Text>
        </View>
      ))}
    </View>
  );
}