// src/app/(protected)/seller/components/SellerActions.tsx
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface SellerActionsProps {
    canMessage: boolean;
    canRate: boolean;
    whatsappEnabled?: boolean;

    onMessage(): void;

    onWhatsapp?(): void;

    onRate(): void;
}

export function SellerActions({
    canMessage,
    canRate,
    whatsappEnabled,
    onMessage,
    onWhatsapp,
    onRate,
}: SellerActionsProps) {
    return (
        <View className="mt-6">

            {canMessage && (
                <View className="flex-row gap-3">

                    <Pressable
                        onPress={onMessage}
                        className="flex-1 flex-row items-center justify-center rounded-xl bg-primary py-3"
                    >
                        <Feather
                            name="message-circle"
                            size={18}
                            color="white"
                        />

                        <Text className="ml-2 font-semibold text-white">
                            Message
                        </Text>

                    </Pressable>

                    {whatsappEnabled && (
                        <Pressable
                            onPress={onWhatsapp}
                            className="flex-row items-center justify-center rounded-xl border border-green-500 px-5"
                        >
                            <Feather
                                name="phone"
                                size={18}
                                color="#22C55E"
                            />

                            <Text className="ml-2 font-semibold text-green-600">
                                WhatsApp
                            </Text>

                        </Pressable>
                    )}

                </View>
            )}

            {canRate && (
                <Pressable
                    onPress={onRate}
                    className="mt-3 flex-row items-center justify-center rounded-xl border border-border bg-card py-3"
                >
                    <Feather
                        name="star"
                        size={18}
                    />

                    <Text className="ml-2 font-semibold text-foreground">
                        Rate Seller
                    </Text>

                </Pressable>
            )}

        </View>
    );
}