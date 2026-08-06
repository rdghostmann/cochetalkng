// components/forum/ForumHeader.tsx

import { Feather } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import type { UserSummary } from "@/types/types";

interface ForumHeaderProps {
  title?: string;

  logoUri?: string;

  currentUser?: UserSummary | null;

  showSearch: boolean;

  onToggleSearch: () => void;

  onNotificationsPress?: () => void;
}

export function ForumHeader({
  title,
  logoUri,
  currentUser,
  showSearch,
  onToggleSearch,
  onNotificationsPress,
}: ForumHeaderProps) {
  const initial =
    currentUser?.full_name
      ?.charAt(0)
      ?.toUpperCase() ?? "U";

  return (
    <View className="border-b border-border bg-dark">
      {/* <View className="border-b border-border bg-background"> */}

      <View className="flex-row items-center justify-between px-4 py-3">

        {/* Logo */}

        <View className="flex-row items-center h-10 w-20 p-4 border">
          <Image
            source={require("../../../assets/images/light-icon.png")}
            resizeMode="contain"
            className="flex-1 w-full"
          />

          <View className="hidden ml-3">
            <Text className="text-lg font-extrabold text-background">
              CocheTalk<Text className="text-primary">NG</Text>
            </Text>

            <Text className="text-xs text-muted">
              Learn • Connect • Fix
            </Text>
          </View>
        </View>

        {/* Actions */}

        <View className="ml-5 flex-row items-center">

          <Pressable
            hitSlop={10}
            onPress={onToggleSearch}
            className="hidden mr-2 h-10 w-10 items-center justify-center rounded-full bg-card"
          >
            <Feather
              name={
                showSearch
                  ? "x"
                  : "search"
              }
              size={20}
              color="#1C1B1F"
            />
          </Pressable>

          <Pressable
            hitSlop={10}
            onPress={onNotificationsPress}
            className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-card"
          >
            <Feather
              name="bell"
              size={20}
              color="#1C1B1F"
            />
          </Pressable>

          <View className="border h-10 w-10">

            {currentUser && (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname:
                      "/profile",
                  } as Href)
                }
                className="relative"
              >
                {currentUser.avatar_url ? (
                  <Image
                    source={{
                      uri: currentUser.avatar_url,
                    }}
                    className="h-11 w-11 rounded-full border border-border"
                  />
                ) : (
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-primary">

                    <Text className="text-base font-bold text-white">
                      {initial}
                    </Text>

                  </View>
                )}

                {currentUser.isVerified && (
                  <View className="absolute -right-0.5 -bottom-0.5 h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-primary">

                    <Feather
                      name="check"
                      size={11}
                      color="#000"
                    />

                  </View>
                )}
              </Pressable>
            )}
          </View>

        </View>

      </View>

    </View>
  );
}