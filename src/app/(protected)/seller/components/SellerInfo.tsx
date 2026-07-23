import { Feather } from "@expo/vector-icons";
import {
    Text,
    View,
} from "react-native";

interface Props {
    name: string;

    role: string;

    location?: string;

    businessName?: string;

    specialization?: string[];

    experience?: number;
}

export function SellerInfo({
    name,
    role,
    location,
    businessName,
    specialization,
    experience,
}: Props) {
    return (
        <View className="mt-5">

            <Text className="text-center text-2xl font-bold text-foreground">
                {name}
            </Text>

            <Text className="mt-1 text-center text-primary">
                {role}
            </Text>

            <View className="mt-5 space-y-3">

                {location && (
                    <View className="flex-row items-center">

                        <Feather
                            name="map-pin"
                            size={15}
                        />

                        <Text className="ml-2 text-muted-foreground">
                            {location}
                        </Text>

                    </View>
                )}

                {businessName && (
                    <View className="flex-row items-center">

                        <Feather
                            name="briefcase"
                            size={15}
                        />

                        <Text className="ml-2 text-muted-foreground">
                            {businessName}
                        </Text>

                    </View>
                )}

                {!!specialization?.length && (
                    <View className="flex-row items-center">

                        <Feather
                            name="tool"
                            size={15}
                        />

                        <Text className="ml-2 text-muted-foreground">
                            {specialization.join(", ")}
                        </Text>

                    </View>
                )}

                {!!experience && (
                    <View className="flex-row items-center">

                        <Feather
                            name="award"
                            size={15}
                        />

                        <Text className="ml-2 text-muted-foreground">
                            {experience} Years Experience
                        </Text>

                    </View>
                )}

            </View>

        </View>
    );
}