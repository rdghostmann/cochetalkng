// components/forum/SponsoredCard.tsx

import React from "react";
import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, Href } from "expo-router";

import { CATEGORY_COLORS } from "@/constants/forum";
import type { MarketplaceListing } from "@/types/marketplace.types";

interface SponsoredCardProps {
  listing: MarketplaceListing;
}

export function SponsoredCard({
  listing,
}: SponsoredCardProps) {
  const categoryColor =
    CATEGORY_COLORS[
      listing.category as keyof typeof CATEGORY_COLORS
    ] ?? "#2563EB";

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/seller/[id]",
          params: {
            id: listing.userId,
          },
        } as Href)
      }
      android_ripple={{
        color: "#00000010",
      }}
      className="mx-4 mb-3 flex-row overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* Left Accent */}

      <View
        style={{
          backgroundColor: categoryColor,
        }}
        className="w-1.5"
      />

      {/* Content */}

      <View className="flex-1 px-4 py-3">

        {/* Header */}

        <View className="flex-row items-center">

          <View
            style={{
              backgroundColor:
                categoryColor + "20",
            }}
            className="rounded-md px-2 py-1"
          >
            <Text
              style={{
                color: categoryColor,
              }}
              className="text-[10px] font-bold uppercase"
            >
              Sponsored
            </Text>
          </View>

          <View
            style={{
              backgroundColor:
                categoryColor + "12",
            }}
            className="ml-2 rounded-md px-2 py-1"
          >
            <Text
              style={{
                color: categoryColor,
              }}
              className="text-[10px] font-semibold"
            >
              {listing.category}
            </Text>
          </View>

          <Text className="ml-auto text-sm font-bold text-primary">
            ₦{listing.price.toLocaleString()}
          </Text>

        </View>

        {/* Title */}

        <Text
          numberOfLines={1}
          className="mt-2 text-base font-semibold text-foreground"
        >
          {listing.title}
        </Text>

        {/* Footer */}

        <View className="mt-2 flex-row items-center">

          <Feather
            name="map-pin"
            size={12}
            className="text-muted-foreground"
          />

          <Text
            numberOfLines={1}
            className="ml-1 flex-1 text-xs text-muted-foreground"
          >
            {listing.location || "Nigeria"} •{" "}
            {listing.userName}
          </Text>

          <Feather
            name="chevron-right"
            size={16}
            className="text-muted-foreground"
          />

        </View>

      </View>
    </Pressable>
  );
}