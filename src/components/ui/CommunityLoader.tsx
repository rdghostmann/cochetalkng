// components/CommunityLoader.tsx

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Image,
  Text,
  View,
} from "react-native";

const DEFAULT_MESSAGES = [
  "Brake issue solved in 5 mins",
  "A mechanic just replied",
  "New repair guide added",
  "3 car owners joined today",
  "Engine diagnosis completed",
  "Spare part found nearby",
  "Question answered in record time",
];

interface CommunityLoaderProps {
  onFinished?: () => void;

  logoUri?: string;

  appName?: string;

  tagline?: string;

  loadingText?: string;

  duration?: number;

  messages?: string[];
}

export function CommunityLoader({
  onFinished,
  logoUri,
  appName = "CocheTalk",
  tagline = "Nigeria's Vehicle Community",
  loadingText = "Loading your community...",
  duration = 2500,
  messages = DEFAULT_MESSAGES,
}: CommunityLoaderProps) {
  const overlayOpacity = useRef(
    new Animated.Value(1)
  ).current;

  const logoScale = useRef(
    new Animated.Value(0.85)
  ).current;

  const logoOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const messageOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const dotScale = useRef(
    new Animated.Value(1)
  ).current;

  const [messageIndex, setMessageIndex] =
    useState(() =>
      Math.floor(Math.random() * messages.length)
    );

  const currentIndex = useRef(messageIndex);

  const mounted = useRef(true);

  const fadeMessage = useCallback(
    (next: number) => {
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(() => {
        if (!mounted.current) return;

        currentIndex.current = next;
        setMessageIndex(next);

        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });
    },
    [messageOpacity]
  );

  useEffect(() => {
    mounted.current = true;

    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),

      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(dotScale, {
          toValue: 1.4,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(dotScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    const interval = setInterval(() => {
      const next =
        (currentIndex.current + 1) %
        messages.length;

      fadeMessage(next);
    }, 700);

    const timer = setTimeout(() => {
      clearInterval(interval);

      pulse.stop();

      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        onFinished?.();
      });
    }, duration);

    return () => {
      mounted.current = false;

      clearInterval(interval);

      clearTimeout(timer);

      pulse.stop();
    };
  }, []);

  return (
    <Animated.View
      style={{
        opacity: overlayOpacity,
      }}
      className="absolute inset-0 z-[9999] bg-background"
      pointerEvents="none"
    >
      <View className="flex-1 items-center justify-center px-8">

        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }}
          className="h-24 w-24 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10"
        >
          {logoUri ? (
            <Image
              source={{ uri: logoUri }}
              resizeMode="cover"
              className="h-16 w-16 rounded-2xl"
            />
          ) : (
            <Text className="text-5xl">
              🔧
            </Text>
          )}
        </Animated.View>

        <Animated.View
          style={{
            opacity: logoOpacity,
          }}
          className="mt-5 items-center"
        >
          <Text className="text-3xl font-extrabold text-foreground">
            {appName}
          </Text>

          <Text className="mt-1 text-sm font-semibold text-primary">
            {tagline}
          </Text>
        </Animated.View>

        <View className="mt-10 w-full max-w-sm">

          <View className="flex-row items-center rounded-2xl border border-border bg-card px-5 py-4">

            <Animated.View
              style={{
                transform: [
                  {
                    scale: dotScale,
                  },
                ],
              }}
              className="mr-3 h-2 w-2 rounded-full bg-primary"
            />

            <Animated.Text
              style={{
                opacity: messageOpacity,
              }}
              numberOfLines={2}
              className="flex-1 text-sm font-medium leading-5 text-card-foreground"
            >
              {messages[messageIndex]}
            </Animated.Text>

          </View>

        </View>

      </View>

      <View className="items-center pb-12">

        <Text className="text-xs font-medium tracking-wide text-muted-foreground">
          {loadingText}
        </Text>

        <View className="mt-3 flex-row">

          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={{
                transform: [
                  {
                    scale:
                      i === 1
                        ? dotScale
                        : 1,
                  },
                ],
              }}
              className="mx-1 h-1.5 w-1.5 rounded-full bg-primary"
            />
          ))}

        </View>

      </View>
    </Animated.View>
  );
}