// .src/app/(tabs)/index.tsx
import { SafeAreaView } from "react-native-safe-area-context";

import { ForumHeader } from "@/components/forum/ForumHeader";
import { FilterChips } from "@/components/forum/FilterChips";
import { AskQuestionModal } from "@/components/forum/AskQuestionModal";
import { QuestionFeed } from "@/components/forum/QuestionFeed";
import { TagFilter } from "@/components/forum/TagFilter";
import { AnnouncementBanner } from "@/components/forum/AnnoucementBanner";
import { SearchBar } from "@/components/forum/SearchBar";
import { SponsoredBanner } from "@/components/forum/SponsoredBanner";
import { FloatingAskButton } from "@/components/forum/FloatingAskButton";
import { useForumStore } from "@/store/forum.store";
import { useMarketplaceStore } from "@/store/marketplace.store";
import { ForumHero } from "@/components/forum/ForumHero";

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

    const featuredAds = useMarketplaceStore((state) => state.featuredAds);

    if (loading) {
        return null;
    }

    return (
        <SafeAreaView
            edges={["top"]}
            className="flex-1 bg-background"
        >
            
            <ForumHeader
                currentUser={currentUser}
                logoUri={cmsConfig.forumLogoUri}
                showSearch={showSearch}
                onToggleSearch={toggleSearch}
            />

            {/* <ForumHero
                onPress={openAskModal}
            /> */}

            {/* {showSearch && ( */}
            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {/* )} */}




            <AnnouncementBanner />

            <FilterChips
                active={activeFilter}
                onChange={setActiveFilter}
            />

            <TagFilter
                tags={tags}
                active={activeTag}
                onChange={setActiveTag}
            />

            <QuestionFeed
                questions={filteredQuestions}
                answers={answers}
            />

            <SponsoredBanner
                ads={featuredAds}
            />

            {currentUser && (
                <FloatingAskButton
                    onPress={openAskModal}
                />
            )}

            <AskQuestionModal
                visible={showAskModal}
                onClose={closeAskModal}
                askQuestion={askQuestion}
            />
        </SafeAreaView>
    );
}