import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AuthHero } from '@/components/auth-hero';
import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { useAuth } from '@/state/auth';

export default function SignUpScreen() {
  const { signUp, error, clearError } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    displayName.trim().length > 0 && email.trim().length > 0 && password.length >= 8 && !submitting;

  const onSubmit = async () => {
    if (!canSubmit) return;
    clearError();
    setSubmitting(true);
    try {
      await signUp(email.trim(), password, displayName.trim());
      router.replace('/(tabs)');
    } catch {
      // Error is surfaced through auth context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen scroll>
      <View className="flex-1 justify-center px-6 py-10 gap-8">
        <AuthHero />

        <View className="gap-2">
          <Text className="font-display text-4xl font-semibold text-ink">Create your account</Text>
          <Text className="text-base text-muted">Start your digital wardrobe in a minute.</Text>
        </View>

        <View className="gap-4">
          <FormField
            label="Display name"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Miori fan"
            autoCapitalize="words"
          />
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
            placeholder="At least 8 characters"
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
          />

          {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

          <PrimaryButton
            label="Sign up"
            onPress={onSubmit}
            loading={submitting}
            disabled={!canSubmit}
          />
        </View>

        <View className="flex-row justify-center gap-1">
          <Text className="text-sm text-muted">Already have an account?</Text>
          <Link href="/sign-in" className="font-semibold text-accent">
            Log in
          </Link>
        </View>
      </View>
    </Screen>
  );
}