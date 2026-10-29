import { Link, router } from 'expo-router';
import { ComponentRef, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { AuthLayout } from '@/components/auth-layout';
import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { useAuth } from '@/state/auth';

const GENDERS = ['Male', 'Female', 'Other'];

export default function SignUpScreen() {
  const { signUp, error, clearError } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailRef = useRef<ComponentRef<typeof TextInput>>(null);
  const passwordRef = useRef<ComponentRef<typeof TextInput>>(null);

  const canSubmit =
    displayName.trim().length > 0 && email.trim().length > 0 && password.length >= 8 && !submitting;

  const onSubmit = async () => {
    if (!canSubmit) return;
    clearError();
    setSubmitting(true);
    try {
      await signUp(email.trim(), password, displayName.trim(), gender ? gender.toLowerCase() : undefined);
      router.replace('/(tabs)');
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your style journey with Miori."
      footer={
        <>
          <Text className="text-sm text-muted">Already have an account?</Text>
          <Link href="/sign-in" className="font-semibold text-accent">
            Sign in
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

      <View className="gap-1.5">
        <Text className="text-xs font-medium text-muted">Gender (optional)</Text>
        <Pressable
          onPress={() => setOpen((v) => !v)}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#34302A',
            backgroundColor: '#1E1C18',
            paddingHorizontal: 16,
            paddingVertical: 13,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 14, color: gender ? '#EDE8DF' : '#6B665D' }}>
            {gender || 'Select gender'}
          </Text>
          <Text style={{ fontSize: 12, color: '#6B665D' }}>{open ? '▲' : '▼'}</Text>
        </Pressable>
        {open && (
          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#34302A',
              backgroundColor: '#1E1C18',
              overflow: 'hidden',
            }}>
            {GENDERS.map((g, i) => (
              <Pressable
                key={g}
                onPress={() => { setGender(g); setOpen(false); }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 13,
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: '#34302A',
                  backgroundColor: gender === g ? '#2A2722' : 'transparent',
                }}>
                <Text style={{ fontSize: 14, color: gender === g ? '#E3C6A6' : '#EDE8DF' }}>{g}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {error ? <Text className="text-sm text-danger">{error}</Text> : null}

      <PrimaryButton label="Sign up" onPress={onSubmit} loading={submitting} disabled={!canSubmit} />
    </AuthLayout>
  );
}
