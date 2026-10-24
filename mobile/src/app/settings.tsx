import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { useAuth } from '@/state/auth';

const SETTINGS_SECTIONS = [
  {
    items: [
      { label: 'Account', sub: '', route: '/edit-profile' },
      { label: 'Notifications', sub: '' },
      { label: 'Appearance', sub: 'System' },
      { label: 'AI Preferences', sub: 'Style, suggestions' },
      { label: 'Data & Privacy', sub: '' },
    ],
  },
  {
    items: [
      { label: 'Help & Support', sub: '' },
      { label: 'About', sub: 'Miori v1.0.0' },
    ],
  },
];

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const onSignOut = async () => {
    await signOut();
    router.replace('/sign-in');
  };

  return (
    <Screen scroll>
      {/* Header */}
      <View className="flex-row items-center gap-3 px-5 pt-4 pb-2">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text className="text-xl text-ink">‹</Text>
        </Pressable>
        <Text className="font-display text-2xl font-semibold text-ink">Settings</Text>
      </View>

      <View className="px-5 pt-4">
        {SETTINGS_SECTIONS.map((section, si) => (
          <View key={si} className="mb-4 overflow-hidden rounded-2xl border border-line bg-surface">
            {section.items.map((item, i) => (
              <Pressable
                key={item.label}
                onPress={item.route ? () => router.push(item.route as never) : undefined}
                disabled={!item.route}
                className={`flex-row items-center justify-between px-5 py-4 ${
                  item.route ? 'active:bg-surface-alt' : ''
                } ${i < section.items.length - 1 ? 'border-b border-line' : ''}`}>
                <Text className="text-base text-ink">{item.label}</Text>
                <View className="flex-row items-center gap-2">
                  {item.sub ? <Text className="text-sm text-muted">{item.sub}</Text> : null}
                  {item.route ? <Text className="text-muted">›</Text> : null}
                </View>
              </Pressable>
            ))}
          </View>
        ))}

        {/* Sign out */}
        <View className="mb-10 overflow-hidden rounded-2xl border border-line bg-surface">
          <Pressable onPress={onSignOut} className="px-4 py-4 active:bg-surface-alt">
            <Text className="text-center text-base font-semibold text-danger">Sign out</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
