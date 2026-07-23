// components/forum/SponsoredBanner.tsx
import React, {
  memo,
} from "react";

import {
  Platform,
  View,
} from "react-native";

import type {
  MarketplaceListing,
} from "@/types/marketplace.types";

import { SponsoredBannerSlider } from "./SponsoredBannerSlider";

interface SponsoredBannerProps {
  ads: MarketplaceListing[];
}

function SponsoredBannerComponent({
  ads,
}: SponsoredBannerProps) {
  if (!ads.length) {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      className={`absolute left-0 right-0 ${
        Platform.OS === "ios"
          ? "bottom-24"
          : "bottom-20"
      }`}
    >
      <SponsoredBannerSlider
        ads={ads}
      />
    </View>
  );
}

export const SponsoredBanner =
  memo(
    SponsoredBannerComponent
  );