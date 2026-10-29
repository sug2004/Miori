import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, Modal, Pressable, Text, View } from 'react-native';

import { useAuth } from '@/state/auth';
import { useDrawer } from '@/state/drawer';

const NAV_ITEMS = [
  { label: 'Home', icon: '⌂', route: '/(tabs)' },
  { label: 'Wardrobe', icon: '⧉', route: '/(tabs)/wardrobe' },
  { label: 'Outfit Generator', icon: '✦', route: '/(tabs)/outfits' },
  { label: 'Mio — AI Stylist Chat', icon: '✧', route: '/(tabs)/chat' },
  { label: 'Inspiration', icon: '❋', route: '/inspiration' },
  { label: 'Shopping', icon: '◎', route: '/(tabs)/shopping' },
  { label: 'Add Clothing Item', icon: '＋', route: '/add-item' },
  { label: 'Profile', icon: '☰', route: '/profile' },
  { label: 'Settings', icon: '⚙', route: '/settings' },
] as const;

export function DrawerMenu() {
  const { isOpen, close } = useDrawer();
  const { signOut } = useAuth();
  const [slideAnim] = useState(() => new Animated.Value(-320));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -320,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [isOpen, slideAnim]);

  const navigate = (route: string) => {
    close();
    setTimeout(() => router.navigate(route as never), 50);
  };

  const onSignOut = async () => {
    close();
    await signOut();
    router.replace('/sign-in');
  };

  return (
    <Modal visible={isOpen} transparent animationType="none" onRequestClose={close}>
      {/* Backdrop */}
      <Pressable className="absolute inset-0 bg-black/60" onPress={close} />

      {/* Drawer panel */}
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          position: 'absolute',
          bottom: 0,
          left: 0,
          top: 0,
          width: 288,
          backgroundColor: '#0D0E0C',
        }}>
        <ImageBackground
          source={require('@/assets/images/drawer-bg.png')}
          style={{ flex: 1 }}>
          {/* Scrim for readability */}
          <View className="absolute inset-0" style={{ backgroundColor: 'rgba(13,14,12,0.55)' }} />
          {/* Right-side fade strips (dark → page bg) */}
          <View className="absolute inset-y-0 right-0" style={{ width: 56, backgroundColor: 'rgba(13,14,12,0.35)' }} />
          <View className="absolute inset-y-0 right-0" style={{ width: 40, backgroundColor: 'rgba(13,14,12,0.45)' }} />
          <View className="absolute inset-y-0 right-0" style={{ width: 26, backgroundColor: 'rgba(13,14,12,0.6)' }} />
          <View className="absolute inset-y-0 right-0" style={{ width: 14, backgroundColor: 'rgba(13,14,12,0.8)' }} />

          {/* Header */}
          <View className="px-6 pt-14 pb-8 border-b border-line/60">
            <Pressable onPress={close} className="mb-6 self-start">
              <Text className="text-2xl text-ink">✕</Text>
            </Pressable>
            <Text className="font-display text-3xl font-semibold text-ink">Miori</Text>
            <Text className="mt-1 text-sm text-muted">Dress a better you</Text>
          </View>

          {/* Nav items */}
          <View className="flex-1 px-4 pt-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => navigate(item.route)}
                className="flex-row items-center gap-4 rounded-xl px-4 py-3.5 active:bg-surface/80">
                <Text className="w-6 text-center text-base text-muted">{item.icon}</Text>
                <Text className="text-base text-ink">{item.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Footer */}
          <View className="px-6 pb-10 border-t border-line/60 pt-4">
            <Text className="text-sm text-muted">Better style</Text>
            <Text className="text-sm text-muted">A better you.</Text>
            <Pressable onPress={onSignOut} className="mt-4">
              <Text className="text-sm text-danger">Sign out</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </Animated.View>
    </Modal>
  );
}
