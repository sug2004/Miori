import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { DrawerButton } from '@/components/drawer-button';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { WardrobeFilters } from '@/components/wardrobe-filters';
import { WardrobeItemCard } from '@/components/wardrobe-item-card';
import { api } from '@/lib/api';
import type { WardrobeItem, WardrobeItemResponse, WardrobeListResponse } from '@/types/api';

export default function WardrobeScreen() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sort, setSort] = useState('recent');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: string[] = [];
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (favoritesOnly) params.push('favorite=true');
      if (debouncedSearch.trim()) params.push(`search=${encodeURIComponent(debouncedSearch.trim())}`);
      if (sort) params.push(`sort=${encodeURIComponent(sort)}`);
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      const data = await api.get<WardrobeListResponse>(`/wardrobe${query}`);
      setItems(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load your wardrobe');
    } finally {
      setLoading(false);
    }
  }, [category, favoritesOnly, debouncedSearch, sort]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const toggleFavorite = async (item: WardrobeItem) => {
    const favorite = !item.favorite;
    setItems((prev) =>
      favoritesOnly && !favorite
        ? prev.filter((entry) => entry.id !== item.id)
        : prev.map((entry) => (entry.id === item.id ? { ...entry, favorite } : entry)),
    );
    try {
      const { item: updated } = await api.patch<WardrobeItemResponse>(`/wardrobe/${item.id}`, {
        favorite,
      });
      setItems((prev) => prev.map((entry) => (entry.id === updated.id ? updated : entry)));
    } catch {
      setItems((prev) =>
        prev.map((entry) => (entry.id === item.id ? { ...entry, favorite: item.favorite } : entry)),
      );
      setError('Could not update favorite');
    }
  };

  const hasFilters = Boolean(category || favoritesOnly || debouncedSearch.trim());

  return (
    <Screen scroll>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
        <View className="flex-row items-center gap-4">
          <DrawerButton />
          <View>
            <Text className="font-display text-2xl font-semibold text-ink">My Wardrobe</Text>
            <Text className="text-sm text-muted">
              {items.length} {items.length === 1 ? 'piece' : 'pieces'}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => setLayout('grid')}
            className={`h-9 w-9 items-center justify-center rounded-xl border ${
              layout === 'grid' ? 'border-accent bg-accent-soft' : 'border-line bg-surface'
            }`}>
            <Text className={layout === 'grid' ? 'text-accent' : 'text-muted'}>▦</Text>
          </Pressable>
          <Pressable
            onPress={() => setLayout('list')}
            className={`h-9 w-9 items-center justify-center rounded-xl border ${
              layout === 'list' ? 'border-accent bg-accent-soft' : 'border-line bg-surface'
            }`}>
            <Text className={layout === 'list' ? 'text-accent' : 'text-muted'}>☰</Text>
          </Pressable>
        </View>
      </View>

      <WardrobeFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        favoritesOnly={favoritesOnly}
        onFavoritesOnlyChange={setFavoritesOnly}
        sort={sort}
        onSortChange={setSort}
      />

      <View className="px-5 pt-5">
        {error ? (
          <Pressable
            onPress={load}
            className="mb-4 rounded-2xl border border-danger/40 bg-danger/10 p-4">
            <Text className="text-sm text-danger">{error} Tap to retry.</Text>
          </Pressable>
        ) : null}

        {loading ? (
          <View className="items-center gap-3 py-16">
            <ActivityIndicator color="#E3C6A6" />
            <Text className="text-sm text-muted">Loading wardrobe…</Text>
          </View>
        ) : items.length === 0 ? (
          <View className="items-center gap-3 rounded-3xl border border-dashed border-line px-6 py-16">
            <Text className="font-display text-xl font-semibold text-ink">
              {hasFilters ? 'Nothing matches' : 'Your wardrobe is empty'}
            </Text>
            <Text className="text-center text-sm text-muted">
              {hasFilters
                ? 'Try clearing filters or search for something else.'
                : 'Add your first piece and let AI fill in the details.'}
            </Text>
            {!hasFilters ? (
              <PrimaryButton
                label="Add your first item"
                onPress={() => router.push('/add-item' as never)}
              />
            ) : null}
          </View>
        ) : (
          <View className={layout === 'grid' ? 'flex-row flex-wrap gap-3' : 'gap-3'}>
            {items.map((item) => (
              <View key={item.id} style={layout === 'grid' ? { width: '48%' } : undefined}>
                <WardrobeItemCard
                  item={item}
                  layout={layout}
                  onPress={() => router.push(`/item/${item.id}` as never)}
                  onToggleFavorite={() => toggleFavorite(item)}
                />
              </View>
            ))}
          </View>
        )}

        <View className="mt-5">
          <PrimaryButton label="+ Add Item" onPress={() => router.push('/add-item' as never)} />
        </View>
        <View className="h-8" />
      </View>
    </Screen>
  );
}
