import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { BookmarkIcon, BulbIcon, HangerIcon, HeartIcon, SparkIcon } from '@/components/icons';
import { DrawerButton } from '@/components/drawer-button';
import { Screen } from '@/components/screen';
import { UserAvatar } from '@/components/user-avatar';
import { api } from '@/lib/api';
import { useAuth } from '@/state/auth';
import type { ProfileOverview } from '@/types/api';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&q=80';

const QUICK_ACCESS = [
  { label: 'Wardrobe', route: '/(tabs)/wardrobe', Icon: HangerIcon },
  { label: 'AI Stylist', route: '/(tabs)/chat', Icon: SparkIcon },
  { label: 'Outfits', route: '/(tabs)/outfits', Icon: HeartIcon },
  { label: 'Inspiration', route: '/inspiration', Icon: BulbIcon },
];

export default function HomeScreen() {
  const { user, isRestoring } = useAuth();
  const [overview, setOverview] = useState<ProfileOverview | null>(null);
  const [saved, setSaved] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      api
        .get<ProfileOverview>('/profile')
        .then((data) => {
          if (!cancelled) setOverview(data);
        })
        .catch(() => {});
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const displayName = user?.displayName ?? user?.email ?? '';
  const name = displayName.split('@')[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good evening';

  const wardrobeCount = overview?.wardrobeItemCount ?? 0;
  const savedCount = overview?.savedLooksCount ?? 0;

  return (
    <Screen scroll>
      {/* Header: drawer left, settings right */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <DrawerButton />
        <Pressable onPress={() => router.push('/settings' as never)} hitSlop={8}>
          <Text className="text-xl text-ink">⚙</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View className="px-5 pt-3 pb-5 flex-row items-end justify-between">
          <View className="flex-1">
            <Text className="font-display text-4xl leading-[44px] text-ink">
              {greeting},
            </Text>
            <Text className="font-display text-4xl leading-[44px] text-ink">
              {isRestoring ? '…' : name}
            </Text>
            <Text className="mt-3 text-sm text-muted">Dress intentionally.</Text>
            <Text className="text-sm text-muted">Live confidently.</Text>
          </View>
          <View className="ml-3">
            <UserAvatar name={name} avatarUrl={user?.avatarUrl} size={56} />
          </View>
        </View>

        {/* Search */}
        <Pressable
          onPress={() => router.push('/(tabs)/wardrobe' as never)}
          className="mx-5 mb-6 flex-row items-center gap-3 rounded-full border border-line bg-surface px-5 py-3.5 active:bg-surface-alt">
          <Text className="text-accent text-lg">⌕</Text>
          <Text className="flex-1 text-base text-muted">Search outfits, items…</Text>
          <Text className="text-lg text-ink">≡</Text>
        </Pressable>

        {/* Hero: Today's Edit */}
        <View className="mx-5 mb-8 overflow-hidden rounded-3xl border border-line">
          <View className="h-[300px]">
            <Image source={{ uri: HERO_IMAGE }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            {/* dark bottom scrim */}
            <View className="absolute inset-x-0 bottom-0" style={{ height: 180, backgroundColor: 'rgba(13,14,12,0.55)' }} />
            {/* bookmark */}
            <Pressable
              onPress={() => setSaved((s) => !s)}
              className="absolute top-4 right-4 h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(13,14,12,0.55)' }}>
              <BookmarkIcon filled={saved} color="#EDE8DF" />
            </Pressable>

            {/* content */}
            <View className="absolute inset-x-0 bottom-0 px-5 pb-6">
              <Text className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Today&apos;s Edit</Text>
              <Text className="font-display text-4xl text-ink mt-1">Smart Casual</Text>
              <Text className="mt-1 text-sm text-ink/90">Clean lines. Quiet confidence.</Text>
              <Pressable
                onPress={() => router.push('/(tabs)/outfits' as never)}
                className="mt-4 self-start flex-row items-center gap-2 rounded-full bg-accent px-6 py-3 active:bg-accent-strong">
                <Text className="text-sm font-semibold text-background">Explore look</Text>
                <Text className="text-sm text-background">→</Text>
              </Pressable>
              {/* dots */}
              <View className="absolute bottom-6 right-5 flex-row gap-1.5">
                <View className="h-1.5 w-5 rounded-full bg-ink/70" />
                <View className="h-1.5 w-1.5 rounded-full bg-ink/40" />
                <View className="h-1.5 w-1.5 rounded-full bg-ink/40" />
              </View>
            </View>
          </View>
        </View>

        {/* Your style, at a glance */}
        <View className="px-5 mb-4 flex-row items-center justify-between">
          <Text className="font-display text-2xl text-ink">Your style, at a glance</Text>
          <Pressable onPress={() => router.push('/profile' as never)} className="flex-row items-center gap-1">
            <Text className="text-sm text-accent">See all</Text>
            <Text className="text-sm text-accent">→</Text>
          </Pressable>
        </View>
        <View className="px-5 mb-8 flex-row gap-3">
          <Pressable
            onPress={() => router.push('/(tabs)/wardrobe' as never)}
            className="flex-1 flex-row items-center rounded-2xl border border-line bg-surface px-4 py-4 active:bg-surface-alt">
            <View className="h-11 w-11 items-center justify-center rounded-full border border-accent/60">
              <HangerIcon />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-[10px] uppercase tracking-widest text-muted">Wardrobe</Text>
              <Text className="font-display text-xl text-ink">{wardrobeCount} pieces</Text>
            </View>
            <Text className="text-muted text-lg">›</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/outfits' as never)}
            className="flex-1 flex-row items-center rounded-2xl border border-line bg-surface px-4 py-4 active:bg-surface-alt">
            <View className="h-11 w-11 items-center justify-center rounded-full border border-accent/60">
              <HeartIcon />
            </View>
            <View className="ml-2 mr-1 flex-1">
              <Text className="text-[10px] uppercase tracking-widest text-muted">Saved looks</Text>
              <Text className="font-display text-xl text-ink">{savedCount} outfits</Text>
            </View>
            <Text className="text-muted text-lg">›</Text>
          </Pressable>
        </View>

        {/* Quick access */}
        <View className="px-5 mb-2">
          <Text className="font-display text-2xl text-ink mb-4">Quick access</Text>
          <View className="flex-row gap-3">
            {QUICK_ACCESS.map(({ label, route, Icon }) => (
              <Pressable
                key={label}
                onPress={() => router.push(route as never)}
                className="flex-1 items-center gap-2.5 rounded-2xl border border-line bg-surface px-1 py-4 active:bg-surface-alt">
                <Icon />
                <Text className="text-[11px] text-ink">{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="h-10" />
      </ScrollView>
    </Screen>
  );
}
