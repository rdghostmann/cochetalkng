import { Pressable, Text, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

interface MarketplaceHeroProps {
  onCreateListing: () => void;
}

export function MarketplaceHero({
  onCreateListing,
}: MarketplaceHeroProps) {
  return (
    <View className="mx-4 mt-4 overflow-hidden rounded-3xl border border-zinc-800 bg-black p-6">

      {/* Badge */}
      <View className="mb-4 self-start flex-row items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5">
        <MaterialCommunityIcons
          name="shopping-outline"
          size={14}
          color="#34D399"
        />

        <Text className="ml-2 text-xs font-bold text-emerald-400">
          Verified Aftersales Marketplace
        </Text>
      </View>

      {/* Heading */}
      <Text className="text-3xl font-extrabold leading-9 text-white">
        Tokunbo Parts,
      </Text>

      <Text className="text-3xl font-extrabold leading-9 text-white">
        Service Deals &
      </Text>

      <Text className="text-3xl font-extrabold leading-9 text-white">
        Direct Cars
      </Text>

      {/* Description */}
      <Text className="mt-4 text-sm leading-6 text-zinc-400">
        Buy genuine imported Tokunbo spare parts,
        book computerized diagnostics, discover
        trusted mechanics, or purchase clean
        cleared vehicles from verified Nigerian
        dealers.
      </Text>

      {/* CTA */}
      <Pressable
        onPress={onCreateListing}
        className="mt-6 flex-row items-center justify-center rounded-2xl bg-emerald-500 px-5 py-4 active:bg-emerald-600"
      >
        <Ionicons
          name="add-circle-outline"
          size={20}
          color="#09090B"
        />

        <Text className="ml-2 text-base font-extrabold text-zinc-950">
          Post a Listing
        </Text>
      </Pressable>

      {/* Footer */}
      <View className="mt-5 flex-row items-center">
        <MaterialCommunityIcons
          name="check-decagram"
          size={16}
          color="#34D399"
        />

        <Text className="ml-2 text-xs text-zinc-400">
          Listings are reviewed before becoming public.
        </Text>
      </View>
    </View>
  );
}