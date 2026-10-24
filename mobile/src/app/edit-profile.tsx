import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { UserAvatar } from '@/components/user-avatar';
import { api } from '@/lib/api';
import { useAuth } from '@/state/auth';
import { PublicUser } from '@/types/api';

export default function EditProfileScreen() {
  const { user, updateUser } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = displayName.trim().length > 0 && !saving && !uploading;

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
          : {
              uri: asset.uri,
              name: asset.fileName ?? `avatar-${Date.now()}.jpg`,
              type: asset.mimeType ?? 'image/jpeg',
            };
      const { user: nextUser } = await api.upload<{ user: PublicUser }>(
        '/profile/avatar',
        file,
      );
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
      });
      updateUser(nextUser);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update profile');
      setSaving(false);
    }
  };

  return (
    <Screen scroll>
      {/* Header */}
      <View className="flex-row items-center gap-3 px-5 pt-4 pb-2">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text className="text-xl text-ink">‹</Text>
        </Pressable>
        <Text className="font-display text-2xl font-semibold text-ink">Edit Profile</Text>
      </View>

      <View className="items-center gap-3 py-6">
        <UserAvatar
          name={displayName || user?.displayName || '?'}
          avatarUrl={avatarUrl}
          size={88}
        />
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

        {error ? <Text className="text-sm text-danger">{error}</Text> : null}

        <PrimaryButton label="Save changes" onPress={onSave} loading={saving} disabled={!canSubmit} />
      </View>

      <View className="h-8" />
    </Screen>
  );
}
