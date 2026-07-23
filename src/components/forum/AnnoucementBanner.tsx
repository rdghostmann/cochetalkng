import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

// components/forum/AnnoucementBanner.tsx
import { useForumStore } from "@/store/forum.store";

export function AnnouncementBanner() {
  const { cmsConfig } = useForumStore();

  if (
    !cmsConfig.announcementActive ||
    !cmsConfig.announcementText
  ) {
    return null;
  }

  return (
    <View className="mx-4 mt-3 flex-row items-center rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
      <Feather
        name="bell"
        size={16}
        color="#2563EB"
      />

      <Text
        numberOfLines={2}
        className="ml-3 flex-1 text-sm font-medium text-primary"
      >
        {cmsConfig.announcementText}
      </Text>
    </View>
  );
}