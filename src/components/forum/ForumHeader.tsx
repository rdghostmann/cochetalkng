// components/forum/ForumHeader.tsx
import { Feather } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface ForumHeaderProps {
  title?: string;

  logoUri?: string;

  currentUser?: {
    id: string;
    name: string;
  } | null;

  showSearch: boolean;

  onToggleSearch: () => void;
}

export function ForumHeader({
  title = "CocheTalk",
  logoUri,
  currentUser,
  showSearch,
  onToggleSearch,
}: ForumHeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">

      <View className="flex-row items-center">

        {logoUri ? (
          <Image
            source={{ uri: logoUri }}
            resizeMode="cover"
            className="h-8 w-8 rounded-lg"
          />
        ) : (
          <View className="h-8 w-8 rounded-lg bg-primary" />
        )}

        <Text className="ml-3 text-xl font-bold text-foreground">
          {title}
        </Text>

      </View>

      <View className="flex-row items-center">

        <Pressable
          onPress={onToggleSearch}
          className="mr-3"
          hitSlop={10}
        >
          <Feather
            name={showSearch ? "x" : "search"}
            size={20}
            color="#1C1B1F"
          />
        </Pressable>

        {currentUser && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/seller/[id]",
                params: {
                  id: currentUser.id,
                },
              } as Href)
            }
            className="h-9 w-9 items-center justify-center rounded-full bg-primary/20"
          >
            <Text className="font-bold text-primary">
              {currentUser.name.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
        )}

      </View>

    </View>
  );
}