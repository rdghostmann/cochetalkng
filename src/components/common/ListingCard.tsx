import React from "react";
import {
  View,
  Text,
 TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export interface ListingCardProps {
  id: number;

  title: string;
  description?: string;

  price: number;

  category:
    | "Parts"
    | "Services"
    | "Car Sales";

  sellerName: string;

  sellerId: string;

  sellerPhone?: string;

  sellerLocation: string;

  sellerWhatsAppEnabled?: boolean;

  timestamp: number;

  approved?: boolean;

  featured?: boolean;

  brand?: string;

  grade?: string;

  vehicleInfo?: string;

  image?: string;

  showAdminActions?: boolean;

  showContactActions?: boolean;

  onPress?: () => void;

  onSellerPress?: () => void;

  onMessage?: () => void;

  onApprove?: () => void;

  onDelete?: () => void;
}

const CATEGORY_COLORS = {
  Parts: "#3B82F6",
  Services: "#10B981",
  "Car Sales": "#F59E0B",
};

function timeAgo(ts: number) {
  const diff = Date.now() - ts;

  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";

  if (mins < 60) return `${mins}m`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `${hrs}h`;

  return `${Math.floor(hrs / 24)}d`;
}

function formatPrice(price: number) {
  return `₦${price.toLocaleString()}`;
}

export default function ListingCard({
  title,
  description,
 price,

  category,

  sellerName,

  sellerPhone,

  sellerLocation,

  sellerWhatsAppEnabled,

  timestamp,

  approved = true,

  brand,

  grade,

  vehicleInfo,

  showAdminActions = false,

  showContactActions = true,

  onPress,

  onSellerPress,

  onMessage,

  onApprove,

  onDelete,
}: ListingCardProps) {
  const categoryColor =
    CATEGORY_COLORS[category];

  function openWhatsApp() {
    if (!sellerPhone) return;

    const phone = sellerPhone.replace(
      /\D/g,
      ""
    );

    Linking.openURL(
      `https://wa.me/${phone}`
    ).catch(() =>
      Alert.alert(
        "WhatsApp",
        "Unable to open WhatsApp."
      )
    );
  }

  return (
    <View className="mx-4 my-2 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">

      {!approved && (
        <View className="mb-4 self-start rounded-full bg-yellow-100 px-3 py-1">

          <Text className="text-xs font-semibold text-yellow-700">

            Pending Approval

          </Text>

        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View className="mb-3 flex-row items-center justify-between">

          <View
            className="rounded-full px-3 py-1"
            style={{
              backgroundColor:
                `${categoryColor}20`,
            }}
          >
            <Text
              style={{
                color: categoryColor,
              }}
              className="text-xs font-semibold"
            >
              {category}
            </Text>
          </View>

          <Text className="text-lg font-bold text-emerald-600">

            {formatPrice(price)}

          </Text>
        </View>

        <Text className="text-base font-bold text-zinc-900 dark:text-white">

          {title}

        </Text>

        {!!description && (
          <Text
            numberOfLines={2}
            className="mt-2 text-sm leading-5 text-zinc-500"
          >
            {description}
          </Text>
        )}

        {!!vehicleInfo && (
          <Text className="mt-2 text-xs text-zinc-500">

            {vehicleInfo}

          </Text>
        )}

        {(brand || grade) && (
          <View className="mt-3 flex-row">

            {brand && (
              <View className="mr-2 rounded-full bg-zinc-100 px-3 py-1">

                <Text className="text-xs">

                  {brand}

                </Text>

              </View>
            )}

            {grade && (
              <View className="rounded-full bg-zinc-100 px-3 py-1">

                <Text className="text-xs">

                  {grade}

                </Text>

              </View>
            )}
          </View>
        )}
      </TouchableOpacity>

      <View className="mt-5 flex-row items-center justify-between">

        <TouchableOpacity
          onPress={onSellerPress}
          className="flex-row items-center"
        >
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-emerald-100">

            <Text className="font-bold text-emerald-700">

              {sellerName[0]}

            </Text>

          </View>

          <View>

            <Text className="font-semibold text-zinc-900 dark:text-white">

              {sellerName}

            </Text>

            <Text className="text-xs text-zinc-500">

              {sellerLocation}

            </Text>

          </View>
        </TouchableOpacity>

        <Text className="text-xs text-zinc-500">

          {timeAgo(timestamp)}

        </Text>
      </View>

      {showContactActions && (
        <View className="mt-5 flex-row">

          <TouchableOpacity
            onPress={onMessage}
            className="mr-2 flex-1 flex-row items-center justify-center rounded-xl bg-emerald-500 py-3"
          >
            <Feather
              name="message-circle"
              size={16}
              color="white"
            />

            <Text className="ml-2 font-semibold text-white">

              Message

            </Text>
          </TouchableOpacity>

          {sellerWhatsAppEnabled && (
            <TouchableOpacity
              onPress={openWhatsApp}
              className="flex-row items-center justify-center rounded-xl border border-green-500 px-5"
            >
              <Feather
                name="phone"
                color="#22C55E"
                size={16}
              />

              <Text className="ml-2 font-semibold text-green-600">

                WhatsApp

              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {showAdminActions && (
        <View className="mt-5 flex-row">

          <TouchableOpacity
            onPress={onApprove}
            className="mr-2 flex-1 rounded-xl bg-blue-500 py-3"
          >
            <Text className="text-center font-semibold text-white">

              {approved
                ? "Unapprove"
                : "Approve"}

            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDelete}
            className="items-center justify-center rounded-xl bg-red-500 px-5"
          >
            <Feather
              name="trash-2"
              size={16}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}