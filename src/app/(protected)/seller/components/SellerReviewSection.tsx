import { StarRating } from "@/components/forum/StarRating";
import { Text, View } from "react-native";


interface SellerRating {
    id: string;

    raterName: string;

    ratingValue: number;

    feedback?: string;

    timestamp: number;
}

interface Props {
    ratings: SellerRating[];
}

function timeAgo(timestamp: number) {
    const seconds =
        (Date.now() - timestamp) / 1000;

    if (seconds < 60)
        return "Just now";

    const minutes =
        Math.floor(seconds / 60);

    if (minutes < 60)
        return `${minutes}m ago`;

    const hours =
        Math.floor(minutes / 60);

    if (hours < 24)
        return `${hours}h ago`;

    return `${Math.floor(
        hours / 24
    )}d ago`;
}

export function SellerReviewSection({
    ratings,
}: Props) {
    if (!ratings.length) {
        return null;
    }

    return (
        <View className="mt-8">

            <Text className="mb-4 text-lg font-bold text-foreground">
                Reviews ({ratings.length})
            </Text>

            {ratings.map((review) => (
                <View
                    key={review.id}
                    className="mb-3 rounded-2xl border border-border bg-card p-4"
                >
                    <View className="flex-row items-center">

                        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">

                            <Text className="font-bold text-primary">
                                {review.raterName.charAt(
                                    0
                                )}
                            </Text>

                        </View>

                        <View className="ml-3 flex-1">

                            <Text className="font-semibold text-foreground">
                                {review.raterName}
                            </Text>

                            <Text className="text-xs text-muted-foreground">
                                {timeAgo(
                                    review.timestamp
                                )}
                            </Text>

                        </View>

                        <StarRating
                            value={
                                review.ratingValue
                            }
                            size={14}
                        />

                    </View>

                    {!!review.feedback && (
                        <Text className="mt-3 leading-6 text-foreground">
                            {review.feedback}
                        </Text>
                    )}

                </View>
            ))}

        </View>
    );
}