import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ContactScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Contact Screen!
      </Text>
      <Link className="text-blue-500 underline" href="/">
        Home
      </Link>
    </View>
  );
}