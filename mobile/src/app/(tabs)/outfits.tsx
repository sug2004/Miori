import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { DrawerButton } from '@/components/drawer-button';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { api } from '@/lib/api';
import type { GenerateOutfitsResponse, Outfit, WardrobeItem } from '@/types/api';

const OCCASIONS = [
  { value: 'casual', label: 'Casual' },
  { value: 'work', label: 'Work' },
  { value: 'date', label: 'Date' },
  { value: 'night', label: 'Night Out' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'formal', label: 'Formal' },
];

export default function OutfitsScreen() {
  const [tab, setTab] = useState<'suggest' | 'saved'>('suggest');
  const [occasion, setOccasion] = useState('casual');
  const [custom, setCustom] = useState('');
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [saved, setSaved] = useState<Outfit[]>([]);
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadSaved = async () => {
    setLoadingSaved(true);
    try {
      const res = await api.get<any>('/outfits');
      setSaved(Array.isArray(res) ? res : res.outfits || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load saved outfits');
    } finally {
      setLoadingSaved(false);
    }
  };

  const loadWardrobe = async () => {
    try {
      const res = await api.get<any>('/wardrobe');
      setWardrobe(Array.isArray(res) ? res : res.items || []);
    } catch {
      // ignore
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTab('suggest');
      setOutfits([]);
      setCustom('');
      setError(null);
      loadSaved();
      loadWardrobe();
    }, []),
  );

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const occ = custom.trim() ? custom.trim() : occasion;
      const res = await api.post<GenerateOutfitsResponse>('/outfits/generate', { occasion: occ });
      setOutfits(res.outfits || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate outfits');
    } finally {
      setLoading(false);
    }
  };

  const deleteOutfit = async (id: string) => {
    setDeletingId(id);
    try {
      await api.remove(`/outfits/${id}`);
      setSaved((prev) => prev.filter((o: any) => o.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete outfit');
    } finally {
      setDeletingId(null);
    }
  };

  const customizer = (outfit: Outfit) => {
    router.push({
      pathname: '/outfit-customize',
      params: {
        outfit: JSON.stringify(outfit),
      },
    } as any);
  };

  return (
    <Screen scroll>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-4">
          <DrawerButton />
          <View>
            <Text className="font-display text-3xl font-semibold text-ink">Outfit Studio</Text>
            <Text className="mt-0.5 text-sm text-muted">Suggest outfits from your wardrobe</Text>
          </View>
        </View>
      </View>

      <View className="px-5 mt-4 flex-row gap-2">
        <Pressable onPress={() => setTab('suggest')} className={`flex-1 rounded-full border px-3 py-2 ${tab === 'suggest' ? 'border-accent bg-accent-soft' : 'border-line bg-surface'}`}>
          <Text className={`text-center text-sm font-medium ${tab === 'suggest' ? 'text-accent' : 'text-muted'}`}>Suggest</Text>
        </Pressable>
        <Pressable onPress={() => setTab('saved')} className={`flex-1 rounded-full border px-3 py-2 ${tab === 'saved' ? 'border-accent bg-accent-soft' : 'border-line bg-surface'}`}>
          <Text className={`text-center text-sm font-medium ${tab === 'saved' ? 'text-accent' : 'text-muted'}`}>Saved</Text>
        </Pressable>
      </View>

      {tab === 'suggest' ? (
        <>
          <View className="px-5 mt-4 gap-3">
            <Text className="text-sm font-medium text-ink">Occasion</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {OCCASIONS.map((o) => (
                <Pressable
                  key={o.value}
                  onPress={() => setOccasion(o.value)}
                  className={`rounded-full border px-3 py-1.5 ${occasion === o.value ? 'border-accent bg-accent-soft' : 'border-line bg-surface'}`}>
                  <Text className={`text-xs font-medium ${occasion === o.value ? 'text-accent' : 'text-muted'}`}>{o.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View className="gap-2">
              <Text className="text-sm font-medium text-ink">Describe event (optional)</Text>
              <TextInput
                value={custom}
                onChangeText={setCustom}
                placeholder="e.g. Interview, College fest, Beach party"
                placeholderTextColor="#9CA3AF"
                className="rounded-2xl border border-line bg-surface px-4 py-3 text-ink"
              />
            </View>
            <PrimaryButton label="Suggest Outfits" onPress={generate} loading={loading} />
            {error ? <Text className="text-sm text-danger">{error}</Text> : null}
            <Text className="text-xs text-muted">Wardrobe items: {wardrobe.length}</Text>
          </View>

          <View className="px-5 mt-6 gap-4">
            {loading ? (
              <View className="items-center py-8">
                <ActivityIndicator color="#E3C6A6" />
              </View>
            ) : null}
            {outfits.map((outfit, idx) => {
              const items = outfit.items || outfit.outfitItems || [];
              const required = items.filter((it: any) => {
                const c = it.wardrobeItem?.category;
                return c === 'top' || c === 'bottom' || c === 'dress' || c === 'shoes';
              });
              return (
                <View key={outfit.id || idx} className="rounded-3xl border border-line bg-surface overflow-hidden">
                  <View className="px-4 pt-4">
                    <Text className="font-display text-lg font-semibold text-ink">{outfit.title}</Text>
                    {outfit.reason ? <Text className="mt-1 text-sm text-muted">{outfit.reason}</Text> : null}
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, padding: 16 }}>
                    {required.map((it: any, i: number) => (
                      <View key={it.id || i} className="w-40">
                        <View className="overflow-hidden rounded-2xl border border-line">
                          <Image source={{ uri: it.wardrobeItem?.imageUrl }} style={{ width: '100%', aspectRatio: 3 / 4 }} contentFit="cover" />
                        </View>
                        <Text className="mt-2 text-xs text-ink" numberOfLines={1}>{it.wardrobeItem?.subcategory || it.wardrobeItem?.category}</Text>
                      </View>
                    ))}
                    {(items || []).filter((it: any) => {
                      const c = it.wardrobeItem?.category;
                      return c === 'accessory' || c === 'outerwear';
                    }).map((it: any, i: number) => (
                      <View key={it.id || i} className="w-40">
                        <View className="overflow-hidden rounded-2xl border border-line">
                          <Image source={{ uri: it.wardrobeItem?.imageUrl }} style={{ width: '100%', aspectRatio: 3 / 4 }} contentFit="cover" />
                        </View>
                        <Text className="mt-2 text-xs text-muted" numberOfLines={1}>{it.wardrobeItem?.subcategory || it.wardrobeItem?.category} (opt)</Text>
                      </View>
                    ))}
                  </ScrollView>
              <View className="px-4 pb-4 flex-row gap-2">
                <Pressable onPress={() => customizer(outfit)} className="flex-1 rounded-full border border-line bg-background px-4 py-2 items-center">
                  <Text className="text-sm font-semibold text-ink">Customize</Text>
                </Pressable>
                <Pressable onPress={async () => {
                  const id = outfit.id || `gen_${idx}`;
                  setSavingId(id);
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
                    await loadSaved();
                    setTab('saved');
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Could not save outfit');
                  } finally {
                    setSavingId(null);
                  }
                }} disabled={savingId === (outfit.id || `gen_${idx}`)} className={`flex-1 rounded-full border border-accent px-4 py-2 items-center ${savingId === (outfit.id || `gen_${idx}`) ? 'bg-accent-soft opacity-70' : 'bg-accent-soft'}`}>
                  {savingId === (outfit.id || `gen_${idx}`) ? <ActivityIndicator color="#E3C6A6" /> : <Text className="text-sm font-semibold text-accent">Save</Text>}
                </Pressable>
              </View>
                </View>
              );
            })}
            {!loading && outfits.length === 0 ? (
              <Text className="text-sm text-muted text-center py-6">Pick occasion/describe event to get suggestions from your wardrobe</Text>
            ) : null}
          </View>
        </>
      ) : (
        <View className="px-5 mt-4 gap-4">
          {loadingSaved ? (
            <View className="items-center py-8">
              <ActivityIndicator color="#E3C6A6" />
            </View>
          ) : null}
          {saved.map((outfit: any, idx) => {
            const items = outfit.outfitItems || outfit.items || [];
            return (
              <View key={outfit.id || idx} className="rounded-3xl border border-line bg-surface overflow-hidden">
                <View className="px-4 pt-4">
                  <Text className="font-display text-lg font-semibold text-ink">{outfit.title}</Text>
                  {outfit.occasion ? <Text className="mt-1 text-xs text-muted capitalize">{outfit.occasion}</Text> : null}
                  {outfit.notes ? <Text className="mt-1 text-sm text-muted">{outfit.notes}</Text> : null}
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, padding: 16 }}>
                  {items.map((it: any, i: number) => (
                    <View key={it.id || i} className="w-40">
                      <View className="overflow-hidden rounded-2xl border border-line">
                        <Image source={{ uri: it.wardrobeItem?.imageUrl }} style={{ width: '100%', aspectRatio: 3 / 4 }} contentFit="cover" />
                      </View>
                      <Text className="mt-2 text-xs text-ink" numberOfLines={1}>{it.wardrobeItem?.subcategory || it.wardrobeItem?.category}</Text>
                    </View>
                  ))}
                </ScrollView>
                <View className="px-4 pb-4">
                  <Pressable onPress={() => deleteOutfit(outfit.id)} disabled={deletingId === outfit.id} className="rounded-full border border-line bg-background px-4 py-2 items-center">
                    {deletingId === outfit.id ? <ActivityIndicator color="#6B7280" /> : <Text className="text-sm font-semibold text-ink">Delete</Text>}
                  </Pressable>
                </View>
              </View>
            );
          })}
          {!loadingSaved && saved.length === 0 ? (
            <Text className="text-sm text-muted text-center py-6">No saved outfits yet</Text>
          ) : null}
        </View>
      )}
      <View className="h-8" />
    </Screen>
  );
}
