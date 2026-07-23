// .src/app/(protected)/seller/[id].tsx
import {
  router,
  useLocalSearchParams,
} from "expo-router";
import { useMemo, useState } from 'react';
import {
  Linking,
  ScrollView,
  Text,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SellerActions, SellerAvatar, SellerHeader, SellerInfo, SellerListingSection, SellerQuestionSection, SellerReviewSection, SellerStats } from './components';
import { RatingModal } from '@/components/forum/RatingModal';
import { makeConversationId } from "@/utils/chat";


export default function SellerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [showRatingModal, setShowRatingModal] = useState(false);

  const [rating, setRating] = useState(5);

  const [feedback, setFeedback] = useState("");


  const seller = useMemo(
    () =>
      users.find(
        (user) => user.id === id
      ),
    [users, id]
  );

  const sellerListings = useMemo(
    () => listings.filter((l) => l.userId === id && l.isApproved).sort((a, b) => b.timestamp - a.timestamp),
    [listings, id],
  );

  const sellerQuestions = useMemo(
    () => questions.filter((q) => q.userId === id && !q.isPrivateEcosystem).sort((a, b) => b.timestamp - a.timestamp).slice(0, 5),
    [questions, id],
  );

  const sellerRatings = useMemo(() => ratings.filter((r) => r.providerId === id), [ratings, id]);

  const avgRating = sellerRatings.length ? sellerRatings.reduce((sum, r) => sum + r.ratingValue, 0) / sellerRatings.length : 0;

  const myRating = currentUser ? sellerRatings.find((r) => r.raterId === currentUser.id) : null;
  const canRate = currentUser && currentUser.id !== id && seller?.role === 'Service Provider';
  const canMessage = currentUser && currentUser.id !== id;

  const handleSubmitRating = () => {
    if (!seller) return;

    if (!feedback.trim()) return;

    addRating(
      seller.id,
      rating,
      feedback.trim()
    );

    setShowRatingModal(false);
    setRating(5);
    setFeedback("");
  };


  const handleMessage = () => {
    if (!currentUser || !seller) return;

    const conversationId = makeConversationId(
      currentUser.id,
      seller.id
    );

    router.push(
      `/(protected)/conversation/${conversationId}`
    );
  };

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

        <Text className="text-base text-muted-foreground">
          Seller not found
        </Text>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">

      <SellerHeader title={seller.name} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-10"
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
          questions={sellerQuestions.length}
          reviews={sellerRatings.length}
          rating={avgRating}
        />

        <SellerActions
          canMessage={!!canMessage}
          canRate={!!canRate}
          whatsappEnabled={seller.whatsappEnabled}
          onMessage={handleMessage}
          onWhatsapp={handleWhatsapp}
          onRate={() => setShowRateModal(true)}
        />

        <SellerListingSection
          listings={sellerListings}
        />

        <SellerQuestionSection
          questions={sellerQuestions}
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
        onClose={() =>
          setShowRatingModal(false)
        }
      />

    </SafeAreaView>
  );
}

