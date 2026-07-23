import {
    Text,
    View,
} from "react-native";

interface Props {
    listings: number;

    questions: number;

    reviews: number;

    rating: number;
}

export function SellerStats({
    listings,
    questions,
    reviews,
    rating,
}: Props) {
    return (
        <View className="mt-6 flex-row rounded-2xl bg-card p-5">

            <View className="flex-1 items-center">
                <Text className="text-xl font-bold text-foreground">
                    {listings}
                </Text>

                <Text className="text-xs text-muted-foreground">
                    Listings
                </Text>
            </View>

            <View className="flex-1 items-center">
                <Text className="text-xl font-bold">
                    {questions}
                </Text>

                <Text className="text-xs text-muted-foreground">
                    Questions
                </Text>
            </View>

            <View className="flex-1 items-center">
                <Text className="text-xl font-bold">
                    {reviews}
                </Text>

                <Text className="text-xs text-muted-foreground">
                    Reviews
                </Text>
            </View>

            <View className="flex-1 items-center">
                <Text className="text-xl font-bold">
                    {rating.toFixed(1)}
                </Text>

                <Text className="text-xs text-muted-foreground">
                    Rating
                </Text>
            </View>

        </View>
    );
}