import { Feather } from "@expo/vector-icons";
import {
    Text,
    View,
} from "react-native";

interface Props {
    name: string;
    verified: boolean;
}

export function SellerAvatar({
    name,
    verified,
}: Props) {
    return (
        <View className="items-center">

            <View className="h-24 w-24 items-center justify-center rounded-full bg-primary/15">

                <Text className="text-4xl font-bold text-primary">
                    {name.charAt(0)}
                </Text>

            </View>

            {verified && (
                <View className="mt-2 flex-row items-center rounded-full bg-green-100 px-3 py-1">

                    <Feather
                        name="check-circle"
                        size={14}
                        color="#22C55E"
                    />

                    <Text className="ml-2 text-xs font-semibold text-green-600">
                        Verified
                    </Text>

                </View>
            )}

        </View>
    );
}