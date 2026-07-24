import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MarketplaceScreen() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-background"
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Feather
            name="shopping-bag"
            size={36}
            color="#00EBBA"
          />
        </View>

        <Text className="mt-6 text-2xl font-bold text-foreground">
          Marketplace
        </Text>

        <Text className="mt-3 text-center text-muted-foreground">
          This is Marketplace.
        </Text>
      </View>
    </SafeAreaView>
  );
}