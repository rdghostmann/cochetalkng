// src/app/(protected)/_layout.tsx

import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="seller/[id]"
        options={{
          title: "Seller Profile",
        }}
      />

      <Stack.Screen
        name="listing/[id]"
        options={{
          title: "Listing",
        }}
      />

      <Stack.Screen
        name="question/[id]"
        options={{
          title: "Question",
        }}
      />

      <Stack.Screen
        name="conversation/[id]"
        options={{
          title: "Conversation",
        }}
      />
    </Stack>
  );
}