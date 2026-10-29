import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { SORT_OPTIONS, WARDROBE_CATEGORIES } from '@/lib/wardrobe';

interface WardrobeFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (value: boolean) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-3.5 py-1.5 ${
        active ? 'border-accent bg-accent-soft' : 'border-line bg-surface active:bg-surface-alt'
      }`}>
      <Text className={`text-xs font-medium ${active ? 'text-accent' : 'text-muted'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export function WardrobeFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  favoritesOnly,
  onFavoritesOnlyChange,
  sort,
  onSortChange,
}: WardrobeFiltersProps) {
  return (
    <View className="gap-3">
      <View className="mx-5 flex-row items-center gap-2 rounded-2xl border border-line bg-surface px-4">
        <Text className="text-muted">🔍</Text>
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Search your wardrobe..."
          placeholderTextColor="#6B665D"
          selectionColor="#E3C6A6"
          autoCorrect={false}
          className="flex-1 py-3 text-base text-ink"
        />
        {search.length > 0 ? (
          <Pressable onPress={() => onSearchChange('')} hitSlop={8}>
            <Text className="text-sm text-muted">✕</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        <Chip label="All" active={!category} onPress={() => onCategoryChange('')} />
        {WARDROBE_CATEGORIES.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            active={category === option.value}
            onPress={() => onCategoryChange(option.value)}
          />
        ))}
        <Chip
          label="♥ Favorites"
          active={favoritesOnly}
          onPress={() => onFavoritesOnlyChange(!favoritesOnly)}
        />
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {SORT_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            active={sort === option.value}
            onPress={() => onSortChange(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
