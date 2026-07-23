import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Pressable,
    Text,
    View,
} from "react-native";

interface Props {
    title: string;
}

export function SellerHeader({
    title,
}: Props) {
    return (
        <View className="flex-row items-center border-b border-border bg-background px-4 py-4">

            <Pressable
                onPress={() =>
                    router.back()
                }
                className="mr-3"
            >
                <Feather
                    name="arrow-left"
                    size={22}
                />
            </Pressable>

            <Text
                numberOfLines={1}
                className="flex-1 text-lg font-bold text-foreground"
            >
                {title}
            </Text>

        </View>
    );
}