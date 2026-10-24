import { Link, router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TextInput } from 'react-native';

import { AuthLayout } from '@/components/auth-layout';
import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { useAuth } from '@/state/auth';

export default function SignUpScreen() {
  const { signUp, error, clearError } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

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
    <AuthLayout
      title="Create your account"
      subtitle="Start your digital wardrobe in a minute."
      footer={
        <>
          <Text className="text-sm text-muted">Already have an account?</Text>
          <Link href="/sign-in" className="font-semibold text-accent">
            Log in
          </Link>
        </>
      }>
      <FormField
        label="Display name"
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Miori fan"
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <FormField
        ref={emailRef}
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
        placeholder="At least 8 characters"
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={onSubmit}
      />

      {error ? <Text className="text-sm text-danger">{error}</Text> : null}

      <PrimaryButton label="Sign up" onPress={onSubmit} loading={submitting} disabled={!canSubmit} />
    </AuthLayout>
  );
}