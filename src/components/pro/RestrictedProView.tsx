import { Feather } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function RestrictedProView() {
    return (
        <View className="flex-1 items-center justify-center px-8">

            <View className="h-24 w-24 items-center justify-center rounded-full bg-pro-circle/10">

                <Feather
                    name="lock"
                    size={42}
                    color="#A78BFA"
                />

            </View>

            <Text className="mt-6 text-2xl font-bold text-foreground">
                Restricted Access
            </Text>

            <Text className="mt-4 text-center leading-6 text-muted-foreground">
                Pro Circle is reserved for verified mechanics and
                automotive service providers.
            </Text>

            <Pressable
                onPress={() => router.push(`/(tabs)/profile` as Href)}
                className="mt-8 rounded-xl border border-border bg-muted px-6 py-4"
            >
                <Text className="font-semibold text-foreground">
                    Switch to Pro Account
                </Text>
            </Pressable>

        </View>
    );
}