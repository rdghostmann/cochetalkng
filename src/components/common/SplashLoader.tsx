// src/components/common/SplashLoader.tsx

import { useEffect } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage =
  Animated.createAnimatedComponent(Image);

export function SplashLoader() {
  const scale = useSharedValue(0.8);

  const logoOpacity = useSharedValue(0);

  const textOpacity = useSharedValue(0);

  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Logo entrance

    logoOpacity.value = withTiming(1, {
      duration: 700,
    });

    scale.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });

    // Breathing animation

    setTimeout(() => {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
    }, 700);

    // Text

    textOpacity.value = withDelay(
      450,
      withTiming(1, {
        duration: 600,
      })
    );

    taglineOpacity.value = withDelay(
      800,
      withTiming(1, {
        duration: 600,
      })
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <View className="flex-1 items-center justify-center bg-background">

      <AnimatedImage
        source={require("../../../assets/images/icon.png")}
        contentFit="contain"
        style={[
          {
            width: 300,
            height: 300,
          },
          logoStyle,
        ]}
      />

      <Animated.Text
        style={textStyle}
        className="mt-8 text-3xl font-extrabold text-foreground"
      >
        CocheTalkNG
      </Animated.Text>

      <Animated.Text
        style={taglineStyle}
        className="mt-2 text-base text-primary"
      >
        Learn • Connect • Fix
      </Animated.Text>

    </View>
  );
}