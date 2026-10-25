import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { api } from '@/lib/api';
import type { Outfit, StyleItemResponse } from '@/types/api';

export default function StyleItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [looks, setLooks] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.post<StyleItemResponse>('/outfits/style-item', { wardrobeItemId: id });
        if (!cancelled) setLooks(res.looks || []);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not style item');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const saveOutfit = async (outfit: Outfit) => {
    try {
      const items = (outfit.items || outfit.outfitItems || []).map((it: any) => ({
        wardrobeItemId: it.wardrobeItemId || it.wardrobeItem?.id,
      }));
      await api.post('/outfits', {
        title: outfit.title,
        occasion: outfit.occasion,
        notes: outfit.reason,
        items,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save outfit');
    }
  };

  return (
    <Screen scroll>
      <View className="flex-row items-center gap-3 px-5 pt-4 pb-2">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text className="text-xl text-ink">‹</Text>
        </Pressable>
        <Text className="font-display text-2xl font-semibold text-ink">Style This Item</Text>
      </View>

      <View className="px-5 mt-4 gap-4">
        {loading ? (
          <View className="items-center py-8">
            <ActivityIndicator color="#F97316" />
          </View>
        ) : null}
        {error ? <Text className="text-sm text-danger">{error}</Text> : null}
        {looks.map((outfit) => {
          const items = outfit.items || outfit.outfitItems || [];
          return (
            <View key={outfit.id} className="rounded-3xl border border-line bg-surface overflow-hidden">
              <View className="px-4 pt-4">
                <Text className="font-display text-lg font-semibold text-ink">{outfit.title}</Text>
                {outfit.reason ? <Text className="mt-1 text-sm text-muted">{outfit.reason}</Text> : null}
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, padding: 16 }}>
                {items.map((it: any, idx: number) => (
                  <View key={it.id || idx} className="w-40">
                    <View className="overflow-hidden rounded-2xl border border-line">
                      <Image
                        source={{ uri: it.wardrobeItem?.imageUrl }}
                        style={{ width: '100%', aspectRatio: 3 / 4 }}
                        contentFit="cover"
                      />
                    </View>
                    <Text className="mt-2 text-xs text-ink" numberOfLines={1}>
                      {it.wardrobeItem?.subcategory || it.wardrobeItem?.category}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View className="px-4 pb-4">
                <Pressable
                  onPress={() => saveOutfit(outfit)}
                  className="rounded-full border border-line bg-background px-4 py-2 items-center">
                  <Text className="text-sm font-semibold text-ink">Save Look</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
        {!loading && looks.length === 0 ? (
          <Text className="text-sm text-muted text-center py-6">No looks generated. Add more items to your wardrobe.</Text>
        ) : null}
        <PrimaryButton label="Try Again" onPress={() => {
          setLoading(true);
          setError(null);
          api
            .post<StyleItemResponse>('/outfits/style-item', { wardrobeItemId: id })
            .then((res) => setLooks(res.looks || []))
            .catch((err) => setError(err instanceof Error ? err.message : 'Could not style item'))
            .finally(() => setLoading(false));
        }} />
      </View>
      <View className="h-8" />
    </Screen>
  );
}
