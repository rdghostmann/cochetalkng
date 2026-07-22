// src/app/+not-found.tsx

import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "404",
          headerShown: true,
        }}
      />

      <View className="flex-1 items-center justify-center bg-background px-6">

        <Text className="text-2xl font-bold text-foreground">
          Page Not Found
        </Text>

        <Text className="mt-3 text-center text-base text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </Text>

        <Link
          href="/"
          className="mt-8 rounded-xl bg-primary px-6 py-3"
        >
          <Text className="font-semibold text-primary-foreground">
            Back to Home
          </Text>
        </Link>

      </View>
    </>
  );
}