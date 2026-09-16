import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { api, NetworkError } from '@/lib/api';
import { useAuth } from '@/state/auth';
import { PublicUser } from '@/types/api';

export default function HomeScreen() {
  const { user, isRestoring, signOut } = useAuth();
  const [profile, setProfile] = useState<PublicUser | null>(null);
  const [checking, setChecking] = useState(false);
  const [checkState, setCheckState] = useState<'idle' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const checkProtectedRoute = useCallback(async () => {
    if (!user) return;
    setChecking(true);
    setCheckState('idle');
    try {
      const me = await api.get<{ user: PublicUser }>('/auth/me');
      setProfile(me.user);
      setCheckState('ok');
      setMessage('Connected to /api/auth/me');
    } catch (err: unknown) {
      setCheckState('error');
      setMessage(err instanceof Error ? err.message : 'Auth check failed');
    } finally {
      setChecking(false);
    }
  }, [user]);

  const onSignOut = async () => {
    await signOut();
    router.replace('/sign-in');
  };

  const displayName = user?.displayName ?? user?.email ?? '';
  const name = displayName.split('@')[0];

  return (
    <Screen>
      <View className="flex-1 justify-between px-6 py-8 gap-8">
        <View className="gap-6">
          <View className="gap-1">
            <Text className="text-sm text-muted">Good to see you</Text>
            <Text className="font-display text-4xl font-semibold text-ink">
              {isRestoring ? '…' : name}
            </Text>
          </View>

          <View className="gap-3 rounded-2xl border border-line bg-surface p-5">
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-ink">Account</Text>
              <View className="rounded-full bg-success/10 px-2.5 py-1">
                <Text className="text-xs font-medium text-success">Logged in</Text>
              </View>
            </View>
            <Text className="text-sm text-muted">{user?.email}</Text>

            <View className="h-px bg-line" />

            <View className="gap-2">
              <Text className="font-semibold text-ink">Protected API route check</Text>
              <Pressable
                onPress={checkProtectedRoute}
                disabled={checking}
                className={`items-center rounded-xl px-4 py-3 ${
                  checkState === 'ok'
                    ? 'bg-success/10'
                    : checkState === 'error'
                      ? 'bg-danger/10'
                      : 'bg-accent-soft active:bg-orange-900/60'
                }`}>
                <Text
                  className={`font-semibold ${
                    checkState === 'ok'
                      ? 'text-success'
                      : checkState === 'error'
                        ? 'text-danger'
                        : 'text-accent'
                  }`}>
                  {checking ? 'Checking…' : profile ? 'Check again' : 'Call /api/auth/me'}
                </Text>
              </Pressable>
              {checkState !== 'idle' ? (
                <Text
                  className={`text-xs ${
                    checkState === 'ok' ? 'text-success' : 'text-danger'
                  }`}>
                  {message}
                </Text>
              ) : null}
              {profile ? (
                <Text className="text-xs text-muted">
                  Server sees user #{profile.id.slice(0, 8)} — JWT is valid.
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        <PrimaryButton label="Log out" onPress={onSignOut} />
      </View>
    </Screen>
  );
}