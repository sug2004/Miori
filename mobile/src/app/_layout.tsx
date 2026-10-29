import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

import { DrawerMenu } from '@/components/drawer-menu';
import { AuthProvider, useAuth } from '@/state/auth';
import { DrawerProvider } from '@/state/drawer';
import '@/global.css';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isReady, user } = useAuth();

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Protected guard={!user}>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
        </Stack.Protected>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="add-item" />
          <Stack.Screen name="inspiration" />
          <Stack.Screen name="item/[id]" />
        </Stack.Protected>
      </Stack>
      <DrawerMenu />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <DrawerProvider>
        <RootNavigator />
      </DrawerProvider>
    </AuthProvider>
  );
}

