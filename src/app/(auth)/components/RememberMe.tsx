import { Text, View } from "react-native";

import { Checkbox } from "@/components/ui/Checkbox";

interface RememberMeProps {
  checked: boolean;
  onChange(): void;
}

export function RememberMe({
  checked,
  onChange,
}: RememberMeProps) {
  return (
    <View className="flex-row items-center">

      <Checkbox
        checked={checked}
        onChange={onChange}
      />

      <Text className="ml-3 text-[15px] font-medium text-foreground">
        Remember me
      </Text>

    </View>
  );
}