import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { WardrobeFields } from '@/components/wardrobe-fields';
import { UserAvatar } from '@/components/user-avatar';
import { api } from '@/lib/api';
import { formToPayload, itemSubtitle, itemTitle, itemToForm } from '@/lib/wardrobe';
import type { WardrobeItem, WardrobeItemResponse } from '@/types/api';
import { useAuth } from '@/state/auth';

type Busy = 'save' | 'wear' | 'delete' | null;

export default function WardrobeItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [item, setItem] = useState<WardrobeItem | null>(null);
  const [form, setForm] = useState(itemToForm(item || ({} as WardrobeItem)));
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get<WardrobeItemResponse>(`/wardrobe/${id}`)
      .then((data) => {
        setItem(data.item);
        setForm(itemToForm(data.item));
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load item'));
  }, [id]);

  useEffect(() => {
    if (!item || editing) {
      return;
    }
    const next = itemToForm(item);
    queueMicrotask(() => {
      setForm((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    });
  }, [editing, item]);

  const toggleFavorite = async () => {
    if (!item) return;
    const favorite = !item.favorite;
    setItem({ ...item, favorite });
    try {
      const { item: updated } = await api.patch<WardrobeItemResponse>(`/wardrobe/${item.id}`, {
        favorite,
      });
      setItem(updated);
    } catch {
      setItem({ ...item, favorite: item.favorite });
      setError('Could not update favorite');
    }
  };

  const markWorn = async () => {
    if (!item) return;
    setBusy('wear');
    setError(null);
    try {
      const { item: updated } = await api.post<WardrobeItemResponse>(`/wardrobe/${item.id}/wear`);
      setItem(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update wear count');
    } finally {
      setBusy(null);
    }
  };

  const onSave = async () => {
    if (!item) return;
    if (!form.imageUrl.trim()) {
      setError('Image URL is required');
      return;
    }
    setBusy('save');
    setError(null);
    try {
      const { item: updated } = await api.patch<WardrobeItemResponse>(
        `/wardrobe/${item.id}`,
        formToPayload(form),
      );
      setItem(updated);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save changes');
      setBusy(null);
    }
  };

  const onDelete = async () => {
    if (!item) return;
    Alert.alert('Remove item', 'Remove this piece from your wardrobe?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          setBusy('delete');
          setError(null);
          try {
            await api.remove(`/wardrobe/${item.id}`);
            router.back();
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not remove item');
            setBusy(null);
          }
        },
      },
    ]);
  };

  if (!item) {
    return (
      <Screen scroll>
        <View className="flex-row items-center gap-3 px-5 pt-4 pb-2">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Text className="text-xl text-ink">‹</Text>
          </Pressable>
          <Text className="font-display text-2xl font-semibold text-ink">Item Details</Text>
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-sm text-muted">{error ?? 'Loading...'}</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Text className="text-xl text-ink">‹</Text>
          </Pressable>
          <Text className="font-display text-2xl font-semibold text-ink">Item Details</Text>
        </View>
        <Pressable
          onPress={() => setEditing(!editing)}
          className="rounded-full border border-line bg-surface px-3 py-1.5 active:bg-surface-alt">
          <Text className="text-sm font-semibold text-accent">{editing ? 'Cancel' : 'Edit'}</Text>
        </Pressable>
      </View>

      <View className="px-5 pt-4">
        <View className="overflow-hidden rounded-3xl border border-line bg-surface">
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: '100%', aspectRatio: 3 / 4 }}
            contentFit="cover"
            transition={150}
          />
        </View>

        <View className="mt-5 flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="font-display text-2xl font-semibold text-ink">{itemTitle(item)}</Text>
            <Text className="mt-1 text-sm text-muted">{itemSubtitle(item)}</Text>
          </View>
          <Pressable
            onPress={toggleFavorite}
            className="h-10 w-10 items-center justify-center rounded-full border border-line bg-surface active:bg-surface-alt">
            <Text className={`text-xl ${item.favorite ? 'text-accent' : 'text-ink'}`}>
              {item.favorite ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        <View className="mt-4 flex-row items-center gap-3 rounded-2xl border border-line bg-surface p-3">
          <UserAvatar name={user?.displayName || user?.email || 'Y'} avatarUrl={user?.avatarUrl} size={40} />
          <View className="flex-1">
            <Text className="text-sm font-medium text-ink">Added to wardrobe</Text>
            <Text className="text-xs text-muted">
              Worn {item.wearCount} {item.wearCount === 1 ? 'time' : 'times'}
            </Text>
          </View>
          <Pressable
            onPress={markWorn}
            disabled={busy === 'wear'}
            className="rounded-full border border-line bg-background px-3 py-1.5 active:bg-surface-alt">
            <Text className="text-xs font-semibold text-ink">
              {busy === 'wear' ? 'Updating…' : '+ Wear'}
            </Text>
          </Pressable>
        </View>

        {!editing ? (
          <View className="mt-5 gap-3">
            <Text className="font-display text-lg font-semibold text-ink">Details</Text>
            <View className="rounded-2xl border border-line bg-surface">
              <DetailRow label="Category" value={item.category} />
              <DetailRow label="Subcategory" value={item.subcategory} />
              <DetailRow label="Color" value={item.color} />
              <DetailRow label="Secondary colors" value={item.secondaryColors.join(', ')} />
              <DetailRow label="Pattern" value={item.pattern} />
              <DetailRow label="Material" value={item.material} />
              <DetailRow label="Fit" value={item.fit} />
              <DetailRow label="Formality" value={item.formality} />
              <DetailRow label="Season" value={item.season} />
              <DetailRow label="Brand" value={item.brand} />
              <DetailRow label="Style tags" value={item.styleTags.join(', ')} />
              <DetailRow label="Source" value={item.source} />
            </View>
            {item.notes ? (
              <View className="rounded-2xl border border-line bg-surface p-4">
                <Text className="text-sm font-medium text-ink">Notes</Text>
                <Text className="mt-1 text-sm text-muted">{item.notes}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View className="mt-5 gap-4">
            <Text className="font-display text-lg font-semibold text-ink">Edit Details</Text>
            <WardrobeFields value={form} onChange={setForm} />
          </View>
        )}

        {error ? <Text className="mt-4 text-sm text-danger">{error}</Text> : null}

        <View className="mt-6 gap-3">
          {editing ? (
            <PrimaryButton
              label="Save changes"
              onPress={onSave}
              loading={busy === 'save'}
              disabled={busy !== null}
            />
          ) : (
            <PrimaryButton label="Style this item" onPress={() => router.push('/(tabs)/wardrobe')} />
          )}
          <Pressable
            onPress={onDelete}
            disabled={busy === 'delete'}
            className="items-center rounded-2xl border border-danger/40 px-6 py-3.5 active:bg-danger/10">
            <Text className="font-semibold text-danger">
              {busy === 'delete' ? 'Removing…' : 'Remove from wardrobe'}
            </Text>
          </Pressable>
        </View>
        <View className="h-8" />
      </View>
    </Screen>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <View className="flex-row items-start justify-between gap-4 px-4 py-3 border-b border-line last:border-b-0">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="flex-1 text-right text-sm text-ink">{value}</Text>
    </View>
  );
}
