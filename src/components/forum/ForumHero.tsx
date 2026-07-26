// components/forum/ForumHero.tsx

import { Feather } from "@expo/vector-icons";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    onPress(): void;
}

export function ForumHero({
    onPress,
}: Props) {
    return (
        <View className="mx-4 mt-4 overflow-hidden rounded-3xl border border-dark-border bg-dark px-6 py-7">

            {/* Decorative Background */}

            <View className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-marketplace/10" />

            {/* Content */}

            <View>

                {/* Badge */}

                <View className="mb-4 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-2">

                    <View className="flex-row items-center">

                        <Feather
                            name="help-circle"
                            size={14}
                            color="#00EBBA"
                        />

                        <Text className="ml-2 text-[11px] font-bold text-primary">
                            Vehicle Diagnostics & Aftersales Community
                        </Text>

                    </View>

                </View>

                {/* Title */}

                <Text className="text-xl font-semibold text-white">

                    Ask Questions, Diagnose Faults & Find Verified Mechanics

                </Text>

                {/* Description */}

                <Text className="mt-4 text-sm leading-6 text-neutral-300">

                    Connect with certified Nigerian mechanics,
                    spare part dealers and experienced car owners
                    for fast, reliable repair guidance.

                </Text>

                {/* CTA */}

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPress}
                    className="mt-7 self-start rounded-2xl bg-primary px-6 py-4"
                >

                    <View className="flex-row items-center">

                        <Feather
                            name="plus-circle"
                            size={18}
                            color="#03120E"
                        />

                        <Text className="ml-2 text-sm font-extrabold text-primary-foreground">

                            Ask a Forum Question

                        </Text>

                    </View>

                </TouchableOpacity>

            </View>

        </View>
    );
}