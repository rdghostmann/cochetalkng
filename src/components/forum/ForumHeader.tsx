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
  title = "CocheTalkNG",
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
    <View className="border-b border-border bg-background">

      <View className="flex-row items-center justify-between px-4 py-3">

        {/* Logo */}

        <Pressable
          className="flex-row items-center"
          onPress={() =>
            router.replace("/(tabs)")
          }
        >
          {logoUri ? (
            <Image
              source={{
                uri: logoUri,
              }}
              className="h-10 w-10 rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary">

              <Text className="text-lg font-extrabold text-black">
                C
              </Text>

            </View>
          )}

          <View className="ml-3">

            <Text className="text-lg font-extrabold text-foreground">
              {title}
            </Text>

            <Text className="text-xs text-muted-foreground">
              Nigeria's Automotive Community
            </Text>

          </View>
        </Pressable>

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

          <View className="border">

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

                    <Text className="text-base font-bold text-black">
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