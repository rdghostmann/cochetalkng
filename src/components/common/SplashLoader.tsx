import { useEffect } from "react";
import { Image } from "expo-image";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Text, View } from "react-native";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export function SplashLoader() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.7);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, {
          duration: 900,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1, {
          duration: 900,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900 }),
        withTiming(0.75, { duration: 900 })
      ),
      -1,
      false
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 items-center justify-center bg-background">

      <AnimatedImage
        source={require("@/assets/images/icon.png")}
        style={[
          {
            width: 120,
            height: 120,
          },
          logoStyle,
        ]}
        contentFit="contain"
      />

      <Text className="mt-8 text-2xl font-bold text-foreground">
        CocheTalkNG
      </Text>

      <Text className="mt-2 text-sm text-muted-foreground">
        Learn • Connect • Fix
      </Text>

    </View>
  );
}