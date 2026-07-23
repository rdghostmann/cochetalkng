// .src/app/(protected)/seller/[id].tsx
import { RatingModal } from "@/components/forum/RatingModal";
import { useSeller } from "@/hooks/useSeller";
import { useForumStore } from "@/store/forum.store";
import { useRatingStore } from "@/store/rating.store";
import { makeConversationId } from "@/utils/chat";
import {
  router,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SellerActions, SellerAvatar, SellerHeader, SellerInfo, SellerListingSection, SellerQuestionSection, SellerReviewSection, SellerStats } from "./components";
import { USER_ROLE } from "@/types/forum.types";


export default function SellerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [showRatingModal, setShowRatingModal] = useState(false);

  const [rating, setRating] = useState(5);

  const [feedback, setFeedback] = useState("");


  const sellerId = typeof id === "string" ? id : "";

  const {
    seller,
    sellerListings,
    sellerQuestions,
    sellerRatings,
    averageRating,
  } = useSeller(sellerId);

  const answers = useForumStore((state) => state.answers);
  const currentUser = useForumStore((state) => state.currentUser);
  const addRating = useRatingStore((state) => state.addRating);

  const displayedQuestions = useMemo(
    () => sellerQuestions.slice(0, 5),
    [sellerQuestions]
  );

  const canRate = useMemo(() => {
    if (!currentUser || !seller) return false;

    return (
      currentUser.id !== seller.id &&
      seller?.role === USER_ROLE.PROVIDER
    );
  }, [currentUser, seller]);

  const canMessage = !!currentUser && currentUser.id !== sellerId;


  const closeRatingModal = () => {
    setShowRatingModal(false);

    setRating(5);

    setFeedback("");
  };
  const handleSubmitRating = useCallback(() => {
    if (!seller || !currentUser || !feedback.trim()) return;

    addRating({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      providerId: seller.id,
      raterId: currentUser.id,
      raterName: currentUser.name,
      ratingValue: rating,
      feedback: feedback.trim(),
      timestamp: Date.now(),
    });

    setShowRatingModal(false);
    setRating(5);
    setFeedback("");
  }, [seller, currentUser, feedback, rating, addRating]);


  const handleMessage = useCallback(() => {
    if (!seller || !currentUser) return;

    const conversationId = makeConversationId(
      currentUser.id,
      seller.id
    );

    console.log(`Navigating to conversation with ID: ${conversationId}`);

    // router.push(`/(protected)/conversation/${conversationId}`);
  }, [seller, currentUser]);

  const handleWhatsapp = () => {
    if (!seller?.phone) return;

    const phone = seller.phone.replace(
      /\D/g,
      ""
    );

    const text = encodeURIComponent(
      `Hi ${seller.name}, I found you on CocheTalk.NG`
    );

    Linking.openURL(
      `https://wa.me/${phone}?text=${text}`
    );
  };


  if (!id) {
    return null;
  }

  if (!seller) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <View className="flex-1 items-center justify-center px-6">

          <Text className="text-lg font-semibold">
            Seller not found
          </Text>

          <Text className="mt-2 text-center text-muted-foreground">
            The seller you're looking for may have been removed.
          </Text>

        </View>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">

      <SellerHeader title={seller.name} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-24"
        showsVerticalScrollIndicator={false}
      >

        <SellerAvatar
          name={seller.name}
          verified={seller.verified}
        />

        <SellerInfo
          name={seller.name}
          role={seller.role}
          location={seller.location}
          businessName={seller.businessName}
          specialization={seller.specialization}
          experience={seller.experience}
        />

        <SellerStats
          listings={sellerListings.length}
          questions={displayedQuestions.length}
          reviews={sellerRatings.length}
          rating={averageRating}
        />

        <SellerActions
          canMessage={canMessage}
          canRate={canRate}
          whatsappEnabled={seller.whatsappEnabled}
          onMessage={handleMessage}
          onWhatsapp={handleWhatsapp}
          onRate={() => setShowRatingModal(true)}
        />

        <SellerListingSection listings={sellerListings} />

        <SellerQuestionSection
          questions={displayedQuestions}
          answers={answers}
        />

        <SellerReviewSection
          ratings={sellerRatings}
        />

      </ScrollView>

      <RatingModal
        visible={showRatingModal}
        sellerName={seller.name}
        rating={rating}
        feedback={feedback}
        onRatingChange={setRating}
        onFeedbackChange={setFeedback}
        onSubmit={handleSubmitRating}
        onClose={closeRatingModal}
      />

    </SafeAreaView>
  );
}