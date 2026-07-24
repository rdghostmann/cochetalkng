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
        <View className="border pb-4 mx-4 mt-3 overflow-hidden rounded-2xl bg-black px-6 py-7">

            {/* Decorative Background */}

            <View className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10" />

            <View className="relative">

                {/* Badge */}

                <View className="border mb-4 self-start flex-row items-center rounded-full px-3 py-1">

                    <Feather
                        name="help-circle"
                        size={14}
                        color="#34D399"
                    />

                    <Text className="ml-2 text-[5px] text-white">
                    {/* <Text className="ml-2 text-[9px] text-[#34D399]"> */}
                        Vehicle Diagnostics & Aftersales Community
                    </Text>

                </View>

                {/* Title */}

                <Text className="text-lg font-extrabold leading-10 text-white">
                    Ask Questions, Diagnose Faults & Find Verified Mechanics
                </Text>

                {/* Description */}

                <Text className="mt-4 text-xs leading-6 text-white">
                    Connect with certified Nigerian mechanics,
                    spare part dealers and experienced car owners
                    for trusted repair advice.
                </Text>

                {/* CTA */}

                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.9}
                    className="my-4 flex-row items-center self-start rounded-xl bg-primary px-6 py-4"
                >

                    <Feather
                        name="plus-circle"
                        size={18}
                        color="#000"
                    />

                    <Text className="ml-2 font-bold text-black">
                        Ask a Forum Question
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
}