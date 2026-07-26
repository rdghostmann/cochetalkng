// .src/app/(tabs)/marketplace.tsx
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MarketplaceScreen() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-background"
    >
      <View className="flex-1">
        <MarketplaceHero 
        onCreateListing={() => {}}
        />
        
      

        
      </View>
    </SafeAreaView>
  );
}