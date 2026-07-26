import { AskQuestionModal } from "@/components/forum/AskQuestionModal";
import { FilterChips } from "@/components/forum/FilterChips";
import { FloatingAskButton } from "@/components/forum/FloatingAskButton";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { ForumHero } from "@/components/forum/ForumHero";
import { QuestionFeed } from "@/components/forum/QuestionFeed";
import { SearchBar } from "@/components/forum/SearchBar";
import { SponsoredBanner } from "@/components/forum/SponsoredBanner";
import { TagFilter } from "@/components/forum/TagFilter";
import { useForumStore, useMarketplaceStore } from "@/store";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { PostQuestionButton } from "@/components/forum/PostQuestionButton";
export default function ForumScreen() {
  const {
    loading,
    showSearch,
    toggleSearch,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    activeTag,
    setActiveTag,
    showAskModal,
    openAskModal,
    closeAskModal,
    filteredQuestions,
    answers,
    tags,
    askQuestion,
    cmsConfig,
    currentUser,
  } = useForumStore();

  const featuredAds = useMarketplaceStore(
    (state) => state.featuredAds
  );

  if (loading) return null;

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-dark"
    // className="flex-1 bg-background"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <ForumHeader
          currentUser={currentUser}
          logoUri={cmsConfig.forumLogoUri}
          showSearch={showSearch}
          onToggleSearch={toggleSearch}
        />




        <View className="bg-dark ">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TagFilter
            tags={tags}
            active={activeTag}
            onChange={setActiveTag}
          />

          <ForumHero onPress={openAskModal} />

        </View>
        <FilterChips
          active={activeFilter}
          onChange={setActiveFilter}
        />

        <QuestionFeed
          questions={filteredQuestions}
          answers={answers}
        />

        <SponsoredBanner
          ads={featuredAds}
        />
      </ScrollView>

      {currentUser && (
        <FloatingAskButton
          onPress={openAskModal}
        />
      )}
      <PostQuestionButton
        onPress={openAskModal}
      />

      <AskQuestionModal
        visible={showAskModal}
        onClose={closeAskModal}
        askQuestion={askQuestion}
      />
    </SafeAreaView>
  );
}