// components/forum/SponsoredBannerSlider.tsx
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Animated,
  Pressable,
  View,
} from "react-native";

import type { MarketplaceListing } from "@/types/marketplace.types";

import { SponsoredCard } from "./SponsoredCard";

interface SponsoredBannerSliderProps {
  ads: MarketplaceListing[];

  autoPlayInterval?: number;
}

function SponsoredBannerSliderComponent({
  ads,
  autoPlayInterval = 4500,
}: SponsoredBannerSliderProps) {
  const [index, setIndex] =
    useState(0);

  const timer = useRef<
    ReturnType<typeof setInterval> | null
  >(null);


  const paused =
    useRef(false);

  const opacity =
    useRef(
      new Animated.Value(1)
    ).current;

  const translateX =
    useRef(
      new Animated.Value(0)
    ).current;

  const currentAd = useMemo(
    () => ads[index],
    [ads, index]
  );

  const animate =
    useCallback(() => {
      if (
        paused.current ||
        ads.length <= 1
      ) {
        return;
      }

      Animated.parallel([
        Animated.timing(
          opacity,
          {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }
        ),

        Animated.timing(
          translateX,
          {
            toValue: -20,
            duration: 220,
            useNativeDriver: true,
          }
        ),
      ]).start(() => {
        setIndex((prev) =>
          (prev + 1) %
          ads.length
        );

        translateX.setValue(20);

        Animated.parallel([
          Animated.timing(
            opacity,
            {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            translateX,
            {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }
          ),
        ]).start();
      });
    }, [
      ads.length,
      opacity,
      translateX,
    ]);

  useEffect(() => {
    if (ads.length <= 1) {
      return;
    }

    timer.current = setInterval(
      animate,
      autoPlayInterval
    );

    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [
    ads.length,
    animate,
    autoPlayInterval,
  ]);

  if (!currentAd) {
    return null;
  }

  return (
    <Pressable
      onPressIn={() => {
        paused.current = true;
      }}
      onPressOut={() => {
        paused.current = false;
      }}
    >
      <Animated.View
        style={{
          opacity,
          transform: [
            {
              translateX,
            },
          ],
        }}
      >
        <SponsoredCard
          listing={currentAd}
        />

        {ads.length > 1 && (
          <View className="mb-2 flex-row items-center justify-center">

            {ads.map(
              (_, i) => (
                <View
                  key={i}
                  className={`mx-1 h-2 w-2 rounded-full ${i === index
                      ? "bg-primary"
                      : "bg-border"
                    }`}
                />
              )
            )}

          </View>
        )}

      </Animated.View>
    </Pressable>
  );
}

export const SponsoredBannerSlider =
  memo(
    SponsoredBannerSliderComponent
  );