import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { UserAvatar } from '@/components/user-avatar';
import { useAuth } from '@/state/auth';
import { useDrawer } from '@/state/drawer';

const QUICK_ACTIONS = [
  { label: 'Plan', icon: '📅' },
  { label: 'Saved', icon: '♡' },
  { label: 'Calendar', icon: '🗓' },
  { label: 'Trends', icon: '📈' },
];

const MAIN_ACTIONS = [
  { label: 'Outfit', icon: '👔', route: '/(tabs)/wardrobe' },
  { label: 'Wardrobe', icon: '🪞', route: '/(tabs)/wardrobe' },
  { label: 'Camera', icon: '📷', route: '/(tabs)/wardrobe' },
  { label: 'Inspire', icon: '✦', route: '/(tabs)/wardrobe' },
];

export default function HomeScreen() {
  const { user, isRestoring } = useAuth();
  const { open } = useDrawer();

  const displayName = user?.displayName ?? user?.email ?? '';
  const name = displayName.split('@')[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <Screen scroll>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <Pressable onPress={open} className="gap-1 p-1">
          <View className="h-0.5 w-5 bg-ink rounded-full" />
          <View className="h-0.5 w-5 bg-ink rounded-full" />
          <View className="h-0.5 w-3 bg-ink rounded-full" />
        </Pressable>
        <Pressable onPress={() => router.push('/profile' as never)}>
          <UserAvatar name={name} avatarUrl={user?.avatarUrl} size={36} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View className="px-5 pt-4 pb-6 gap-1">
          <Text className="text-sm text-muted">{greeting},</Text>
          <Text className="font-display text-3xl font-semibold text-ink">
            {isRestoring ? '…' : name}
          </Text>
          <Text className="text-sm text-muted mt-1">Dress intentionally.</Text>
          <Text className="text-sm text-muted">Live confidently.</Text>
        </View>

        {/* Search bar */}
        <Pressable className="mx-5 mb-6 flex-row items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
          <Text className="text-muted">🔍</Text>
          <Text className="text-base text-muted">Search anything...</Text>
        </Pressable>

        {/* Main action grid */}
        <View className="mx-5 mb-6 flex-row justify-between">
          {MAIN_ACTIONS.map((a) => (
            <Pressable
              key={a.label}
              onPress={() => router.push(a.route as never)}
              className="items-center gap-2">
              <View className="h-14 w-14 rounded-2xl bg-surface border border-line items-center justify-center">
                <Text className="text-2xl">{a.icon}</Text>
              </View>
              <Text className="text-xs text-muted">{a.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Today's suggestion card */}
        <View className="mx-5 mb-6 rounded-2xl border border-line bg-surface p-5 gap-3">
          <Text className="text-xs text-muted uppercase tracking-widest">Today&apos;s Suggestion</Text>
          <Text className="font-display text-xl font-semibold text-ink">Smart Casual</Text>
          <Text className="text-sm text-muted">Clean, minimal, timeless.</Text>
          <Pressable className="self-start rounded-xl bg-accent px-5 py-2.5 active:bg-accent-strong">
            <Text className="text-sm font-semibold text-white">Try Look</Text>
          </Pressable>
        </View>

        {/* Quick actions */}
        <View className="px-5 mb-4">
          <Text className="text-sm font-semibold text-ink mb-3">Quick Actions</Text>
          <View className="flex-row justify-between">
            {QUICK_ACTIONS.map((a) => (
              <Pressable key={a.label} className="items-center gap-2">
                <View className="h-12 w-12 rounded-2xl bg-surface border border-line items-center justify-center">
                  <Text className="text-xl">{a.icon}</Text>
                </View>
                <Text className="text-xs text-muted">{a.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="h-8" />
      </ScrollView>
    </Screen>
  );
}
