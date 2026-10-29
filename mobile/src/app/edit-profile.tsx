import { router, useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text, View } from 'react-native';

import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { UserAvatar } from '@/components/user-avatar';
import { api } from '@/lib/api';
import { useAuth } from '@/state/auth';
import { ProfileOverview, PublicUser } from '@/types/api';

const cap = (s: string | null | undefined) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export default function EditProfileScreen() {
  const { user: authUser, updateUser } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Always fetch fresh from API on focus so saved values are reflected immediately
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setLoaded(false);
      api.get<ProfileOverview>('/profile').then((data) => {
        if (cancelled) return;
        const u = data.user;
        setDisplayName(u.displayName ?? '');
        setAvatarUrl(u.avatarUrl ?? '');
        setBio(u.bio ?? '');
        setGender(cap(u.gender));
        setLoaded(true);
      }).catch(() => {
        if (cancelled) return;
        setDisplayName(authUser?.displayName ?? '');
        setAvatarUrl(authUser?.avatarUrl ?? '');
        setBio(authUser?.bio ?? '');
        setGender(cap(authUser?.gender));
        setLoaded(true);
      });
      return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const canSubmit = loaded && displayName.trim().length > 0 && !saving && !uploading;

  const pickAndUploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || result.assets.length === 0) return;
    const asset = result.assets[0];
    setUploading(true);
    setError(null);
    try {
      const file: Blob | { uri: string; name: string; type: string } =
        Platform.OS === 'web' && asset.file
          ? asset.file
          : { uri: asset.uri, name: asset.fileName ?? `avatar-${Date.now()}.jpg`, type: asset.mimeType ?? 'image/jpeg' };
      const { user: nextUser } = await api.upload<{ user: PublicUser }>('/profile/avatar', file);
      updateUser(nextUser);
      setAvatarUrl(nextUser.avatarUrl ?? asset.uri);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Photo upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    if (!canSubmit) return;
    setSaving(true);
    setError(null);
    try {
      const { user: nextUser } = await api.patch<{ user: PublicUser }>('/profile', {
        displayName: displayName.trim(),
        avatarUrl: avatarUrl.trim() || null,
        bio: bio.trim() || null,
        gender: gender ? gender.toLowerCase() : null,
      });
      updateUser(nextUser);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update profile');
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D0E0C' }}>
        <ActivityIndicator color="#E3C6A6" />
      </View>
    );
  }

  return (
    <Screen scroll>
      <View className="flex-row items-center gap-3 px-5 pt-4 pb-2">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text className="text-xl text-ink">‹</Text>
        </Pressable>
        <Text className="font-display text-2xl font-semibold text-ink">Edit Profile</Text>
      </View>

      <View className="items-center gap-3 py-6">
        <UserAvatar name={displayName || authUser?.displayName || '?'} avatarUrl={avatarUrl} size={88} />
        <Pressable
          onPress={pickAndUploadPhoto}
          disabled={uploading}
          className="rounded-full border border-line bg-surface px-4 py-2 active:bg-surface-alt">
          <Text className="text-sm font-semibold text-accent">
            {uploading ? 'Uploading…' : 'Change photo'}
          </Text>
        </Pressable>
      </View>

      <View className="gap-4 px-5">
        <FormField
          label="Display name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="How should we call you?"
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
        />
        <FormField
          label="Avatar URL"
          value={avatarUrl}
          onChangeText={setAvatarUrl}
          placeholder="https://example.com/avatar.png"
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />
        <FormField
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="A few words about your style…"
          multiline
          style={{ minHeight: 108, textAlignVertical: 'top' }}
        />

        <View className="gap-1.5">
          <Text className="text-xs font-medium text-muted">Gender</Text>
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
            <View style={{ borderRadius: 12, borderWidth: 1, borderColor: '#34302A', backgroundColor: '#1E1C18', overflow: 'hidden' }}>
              {(['Male', 'Female', 'Other'] as const).map((g, i) => (
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

        <PrimaryButton label="Save changes" onPress={onSave} loading={saving} disabled={!canSubmit} />
      </View>

      <View className="h-8" />

      {saving && (
        <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(13,14,12,0.6)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#1E1C18', borderRadius: 16, paddingHorizontal: 24, paddingVertical: 14, borderWidth: 1, borderColor: '#34302A' }}>
            <ActivityIndicator size="small" color="#E3C6A6" />
            <Text style={{ fontSize: 14, color: '#EDE8DF' }}>Saving…</Text>
          </View>
        </View>
      )}
    </Screen>
  );
}
