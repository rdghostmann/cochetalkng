// src/components/auth/AuthFooter.tsx

import { Link, Href } from "expo-router";
import { Text, View } from "react-native";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: Href;
}

export function AuthFooter({
  text,
  linkText,
  href,
}: AuthFooterProps) {
  return (
    <View className="mt-8 flex-row items-center justify-center">

      <Text className="text-muted-foreground">
        {text}
      </Text>

      <Link
        href={href}
        className="ml-1 font-semibold text-primary"
      >
        {linkText}
      </Link>

    </View>
  );
}