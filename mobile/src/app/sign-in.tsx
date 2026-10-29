import { Link, router } from 'expo-router';
import { ComponentRef, useRef, useState } from 'react';
import { Text, TextInput } from 'react-native';

import { AuthLayout } from '@/components/auth-layout';
import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { useAuth } from '@/state/auth';

export default function SignInScreen() {
  const { signIn, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const passwordRef = useRef<ComponentRef<typeof TextInput>>(null);

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
    <AuthLayout
      title="Welcome back"
      subtitle="Good to see you again."
      footer={
        <>
          <Text className="text-sm text-muted">New here?</Text>
          <Link href="/sign-up" className="font-semibold text-accent">
            Create an account
          </Link>
        </>
      }>
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <FormField
        ref={passwordRef}
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={onSubmit}
      />

      {error ? <Text className="text-sm text-danger">{error}</Text> : null}

      <PrimaryButton label="Log in" onPress={onSubmit} loading={submitting} disabled={!canSubmit} />
    </AuthLayout>
  );
}