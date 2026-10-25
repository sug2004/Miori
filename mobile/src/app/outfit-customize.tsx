import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { api } from '@/lib/api';
import type { Outfit, WardrobeItem } from '@/types/api';

export default function OutfitCustomizeScreen() {
  const params = useLocalSearchParams<{ outfit: string }>();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [occasion, setOccasion] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (params.outfit) {
      try {
        const parsed = JSON.parse(params.outfit);
        setOutfit(parsed);
        setItems(parsed.items || parsed.outfitItems || []);
        setTitle(parsed.title || '');
        setNotes(parsed.reason || '');
        setOccasion(parsed.occasion || '');
      } catch {}
    }
    loadWardrobe();
  }, [params.outfit]);

  const loadWardrobe = async () => {
    try {
      const res = await api.get<any>('/wardrobe');
      setWardrobe(Array.isArray(res) ? res : res.items || []);
    } catch {}
  };

  const replaceItem = (index: number, newItem: WardrobeItem) => {
    const next = [...items];
    next[index] = {
      ...next[index],
      wardrobeItemId: newItem.id,
      wardrobeItem: newItem,
    };
    setItems(next);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        title: title || 'My Outfit',
        occasion: occasion || null,
        notes: notes || null,
        items: items.map((it: any, idx: number) => ({
          wardrobeItemId: it.wardrobeItemId || it.wardrobeItem?.id,
          position: idx,
        })),
      };
      await api.post('/outfits', payload);
      Alert.alert('Saved', 'Outfit saved to your list', [
        { text: 'OK', onPress: () => router.push('/(tabs)/outfits') },
      ]);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Could not save outfit');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen scroll>
      <View className="px-5 pt-4 pb-2">
        <Text className="font-display text-3xl font-semibold text-ink">Customize Outfit</Text>
        <Text className="mt-1 text-sm text-muted">Swap items and add notes</Text>
      </View>

      <View className="px-5 mt-4 gap-3">
        <View className="gap-2">
          <Text className="text-sm font-medium text-ink">Title</Text>
          <TextInput value={title} onChangeText={setTitle} className="rounded-2xl border border-line bg-surface px-4 py-3 text-ink" />
        </View>
        <View className="gap-2">
          <Text className="text-sm font-medium text-ink">Occasion</Text>
          <TextInput value={occasion} onChangeText={setOccasion} className="rounded-2xl border border-line bg-surface px-4 py-3 text-ink" />
        </View>
        <View className="gap-2">
          <Text className="text-sm font-medium text-ink">Description / Improvements</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            placeholder="Add styling tips or tweaks..."
            placeholderTextColor="#9CA3AF"
            className="rounded-2xl border border-line bg-surface px-4 py-3 text-ink"
            style={{ textAlignVertical: 'top' }}
          />
        </View>
      </View>

      <View className="px-5 mt-6 gap-3">
        <Text className="text-sm font-medium text-ink">Items in this look</Text>
        {items.map((it: any, idx: number) => (
          <View key={it.id || idx} className="rounded-3xl border border-line bg-surface overflow-hidden">
            <View className="flex-row">
              <View className="w-28">
                <Image source={{ uri: it.wardrobeItem?.imageUrl }} style={{ width: '100%', height: 140 }} contentFit="cover" />
              </View>
              <View className="flex-1 px-4 py-3">
                <Text className="font-semibold text-ink">{it.wardrobeItem?.subcategory || it.wardrobeItem?.category}</Text>
                <Text className="mt-1 text-xs text-muted">{it.wardrobeItem?.color}</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, padding: 12 }}>
              {wardrobe
                .filter((w) => w.category === it.wardrobeItem?.category)
                .filter((w) => w.id !== it.wardrobeItem?.id)
                .slice(0, 16)
                .map((w) => (
                  <Pressable key={w.id} onPress={() => replaceItem(idx, w)} className="w-20">
                    <View className="overflow-hidden rounded-xl border border-line">
                      <Image source={{ uri: w.imageUrl }} style={{ width: '100%', aspectRatio: 1 }} contentFit="cover" />
                    </View>
                    <Text className="mt-1 text-[10px] text-muted" numberOfLines={1}>{w.subcategory || w.category}</Text>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        ))}
      </View>

      <View className="px-5 mt-6">
        <Pressable onPress={save} disabled={saving} className={`rounded-full py-3 items-center ${saving ? 'bg-accent/70' : 'bg-accent'}`}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text className="text-base font-semibold text-white">Save Outfit</Text>}
        </Pressable>
      </View>
      <View className="h-8" />
    </Screen>
  );
}
