import { View } from "react-native";

import { SearchBar } from "./SearchBar";
import { FilterButton } from "./FilterButton";
import { TagFilter } from "./TagFilter";

interface SearchHeaderProps {
  search: string;
  onSearchChange: (text: string) => void;

  tags: string[];
  activeTag?: string;
  onTagChange: (tag: string) => void;

  onOpenFilters: () => void;
}

export function SearchHeader({
  search,
  onSearchChange,
  tags,
  activeTag,
  onTagChange,
  onOpenFilters,
}: SearchHeaderProps) {
  return (
    <View className="pt-3">
      {/* Search + Filter */}
      <View className="flex-row items-center px-4">
        <View className="mr-3 flex-1">
          <SearchBar
            value={search}
            onChangeText={onSearchChange}
            autoFocus={false}
          />
        </View>

        <FilterButton onPress={onOpenFilters} />
      </View>

      {/* Horizontal Tags */}
      <TagFilter
        tags={tags}
        active={activeTag}
        onChange={onTagChange}
      />
    </View>
  );
}