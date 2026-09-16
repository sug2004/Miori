import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AuthHero } from '@/components/auth-hero';
import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { useAuth } from '@/state/auth';

export default function SignInScreen() {
  const { signIn, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting;

  const onSubmit = async () => {
    if (!canSubmit) return;
    clearError();
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch {
      // Error is surfaced through auth context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen scroll>
      <View className="flex-1 justify-center px-6 py-8 gap-8">
        <AuthHero />

        <View className="gap-2">
          <Text className="font-display text-4xl font-semibold text-ink">Welcome back</Text>
          <Text className="text-base text-muted">Log in to your wardrobe.</Text>
        </View>

        <View className="gap-4">
          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <FormField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            autoComplete="current-password"
            textContentType="password"
          />

          {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

          <PrimaryButton label="Log in" onPress={onSubmit} loading={submitting} disabled={!canSubmit} />
        </View>

        <View className="flex-row justify-center gap-1">
          <Text className="text-sm text-muted">New here?</Text>
          <Link href="/sign-up" className="font-semibold text-accent">
            Create an account
          </Link>
        </View>
      </View>
    </Screen>
  );
}