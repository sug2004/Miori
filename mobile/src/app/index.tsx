import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { useAuth } from '@/state/auth';

export default function IndexScreen() {
  const { isReady, user } = useAuth();

  if (!isReady) {
    return <View className="flex-1 bg-background" />;
  }

  return <Redirect href={user ? '/(tabs)' : '/sign-in'} />;
}