// .src/app/(tabs)/_layout.tsx
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import {
  useAuthStore,
  useNotificationStore,
} from "@/store";
import { useAppStore } from "@/store/app.store";

export default function TabsLayout() {
  const unreadCount = useNotificationStore(
    (state) => state.unreadCount
  );

  const user = useAuthStore(
    (state) => state.user
  );

  const {
    marketplaceVisible,
    clinicVisible,
  } = useAppStore();

  const role =
    user?.user_metadata?.role ??
    "Car Owner";

  const isAdmin =
    role === "Admin";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#00EBBA",

        tabBarInactiveTintColor: "#8E8E93",

        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Forum",

          tabBarIcon: ({ color, size }) => (
            <Feather
              name="message-square"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="marketplace"
        options={{
          href:
            marketplaceVisible || isAdmin
              ? undefined
              : null,

          title: "Market",

          tabBarIcon: ({ color, size }) => (
            <Feather
              name="shopping-bag"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",

          tabBarIcon: ({ color, size }) => (
            <Feather
              name="message-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Alerts",

          tabBarBadge:
            unreadCount > 0
              ? unreadCount
              : undefined,

          tabBarIcon: ({ color, size }) => (
            <Feather
              name="bell"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="clinic"
        options={{
          href:
            clinicVisible || isAdmin
              ? undefined
              : null,

          title: "Clinic",

          tabBarIcon: ({ color, size }) => (
            <Feather
              name="activity"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Feather
              name="user"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}