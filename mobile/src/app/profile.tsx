import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { DrawerButton } from '@/components/drawer-button';
import { Screen } from '@/components/screen';
import { UserAvatar } from '@/components/user-avatar';
import { api } from '@/lib/api';
import { useAuth } from '@/state/auth';
import { ProfileOverview } from '@/types/api';

function formatStyleTags(prefs: ProfileOverview['stylePreferences']): string {
  const lists = [
    prefs?.styleTags,
    prefs?.styleGoals,
    prefs?.colorPalette,
    prefs?.preferredCategories,
  ];
  for (const list of lists) {
    if (Array.isArray(list) && list.length > 0) {
      return list.filter((item) => typeof item === 'string').join(', ');
    }
  }
  return 'Not set yet';
}

export default function ProfileScreen() {
  const { user } = useAuth();
  const [overview, setOverview] = useState<ProfileOverview | null>(null);
  const [failed, setFailed] = useState(false);

  const loadProfile = useCallback(() => {
    let cancelled = false;
    setFailed(false);
    api
      .get<ProfileOverview>('/profile')
      .then((data) => {
        if (cancelled) return;
        setOverview(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useFocusEffect(loadProfile);

  const profileUser = overview?.user ?? user;
  const name = profileUser?.displayName ?? profileUser?.email?.split('@')[0] ?? 'You';
  const joinYear = profileUser?.createdAt
    ? new Date(profileUser.createdAt).getFullYear()
    : new Date().getFullYear();

  const rows = [
    {
      label: 'My Wardrobe',
      value: `${overview?.wardrobeItemCount ?? '—'} items`,
      route: '/(tabs)/wardrobe',
    },
    { label: 'Saved Looks', value: `${overview?.savedLooksCount ?? '—'} looks` },
    {
      label: 'Style Preferences',
      value: overview ? formatStyleTags(overview.stylePreferences) : '…',
    },
    { label: 'Reminders', value: 'Outfit reminders' },
    { label: 'Settings', value: 'App preferences', route: '/settings' },
  ];

  return (
    <Screen scroll>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-4">
          <DrawerButton />
          <Text className="font-display text-2xl font-semibold text-ink">My Profile</Text>
        </View>
        <Pressable onPress={() => router.push('/settings' as never)} hitSlop={8}>
          <Text className="text-xl text-ink">⚙</Text>
        </Pressable>
      </View>

      {/* Avatar + name */}
      <View className="items-center gap-3 py-8">
        <UserAvatar name={name} avatarUrl={profileUser?.avatarUrl} size={80} />
        <Text className="font-display text-2xl font-semibold text-ink">{name}</Text>
        <Text className="text-sm text-muted">Style journey since {joinYear}</Text>
        {profileUser?.bio ? (
          <Text className="px-10 text-center text-sm text-muted">{profileUser.bio}</Text>
        ) : null}
        <Pressable
          onPress={() => router.push('/edit-profile' as never)}
          className="rounded-full border border-line bg-surface px-5 py-2 active:bg-surface-alt">
          <Text className="text-sm font-semibold text-ink">Edit profile</Text>
        </Pressable>
      </View>

      {failed ? (
        <Pressable
          onPress={loadProfile}
          className="mx-5 mb-4 rounded-2xl border border-line bg-danger/10 p-4">
          <Text className="text-sm text-danger">
            Could not load your wardrobe stats. Tap to retry.
          </Text>
        </Pressable>
      ) : null}

      {/* Rows */}
      <View className="mx-5 overflow-hidden rounded-2xl border border-line bg-surface">
        {rows.map((row, i) => (
          <Pressable
            key={row.label}
            onPress={row.route ? () => router.push(row.route as never) : undefined}
            disabled={!row.route}
            className={`flex-row items-center justify-between px-5 py-4 ${
              row.route ? 'active:bg-surface-alt' : ''
            } ${i < rows.length - 1 ? 'border-b border-line' : ''}`}>
            <Text className="text-base text-ink">{row.label}</Text>
            <View className="flex-1 flex-row items-center justify-end gap-2">
              <Text numberOfLines={1} className="text-right text-sm text-muted">
                {row.value}
              </Text>
              {row.route ? <Text className="text-muted">›</Text> : null}
            </View>
          </Pressable>
        ))}
      </View>

      <View className="h-8" />
    </Screen>
  );
}
