// 
import { Text, View } from "react-native";

import type { MarketplaceListing } from "@/types/marketplace.types";
import ListingCard from "@/components/ui/ListingCard";

interface Props {
    listings: MarketplaceListing[];
}

export function SellerListingSection({
    listings,
}: Props) {
    if (!listings.length) return null;

    return (
        <View className="mt-8">

            <Text className="mb-4 text-lg font-bold text-foreground">
                Listings ({listings.length})
            </Text>

            {listings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    listing={listing}
                />
            ))}

        </View>
    );
}