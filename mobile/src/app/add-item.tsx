import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { DrawerButton } from '@/components/drawer-button';
import { CameraIcon, GalleryIcon, PencilIcon } from '@/components/icons';
import { FormField } from '@/components/form-field';
import { PrimaryButton } from '@/components/primary-button';
import { Screen } from '@/components/screen';
import { api } from '@/lib/api';
import { toUploadFile } from '@/lib/upload-file';
import {
  EMPTY_WARDROBE_FORM,
  WARDROBE_CATEGORIES,
  draftToForm,
  formToPayload,
  type WardrobeFormValue,
} from '@/lib/wardrobe';
import type { WardrobeItemResponse, WardrobeUploadResponse } from '@/types/api';

type Step = 'choose' | 'form';
type Busy = 'upload' | 'save' | null;

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [3, 4],
  quality: 0.8,
};

function TypeChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-3 py-1.5 ${
        active ? 'border-accent bg-accent-soft' : 'border-line bg-surface active:bg-surface-alt'
      }`}>
      <Text className={`text-xs font-medium ${active ? 'text-accent' : 'text-muted'}`}>{label}</Text>
    </Pressable>
  );
}

export default function AddItemScreen() {
  const [step, setStep] = useState<Step>('choose');
  const [form, setForm] = useState<WardrobeFormValue>(EMPTY_WARDROBE_FORM);
  const [source, setSource] = useState<'ai' | 'manual'>('manual');
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadAsset = async (asset: ImagePicker.ImagePickerAsset) => {
    setBusy('upload');
    setError(null);
    try {
      const { imageUrl, draft } = await api.upload<WardrobeUploadResponse>(
        '/wardrobe/upload',
        toUploadFile(asset),
      );
      setForm(draftToForm(draft, imageUrl));
      setSource(draft.source);
      setStep('form');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(null);
    }
  };

  const pickPhoto = async (fromCamera: boolean) => {
    if (fromCamera) {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        setError('Camera access is needed to take a photo.');
        return;
      }
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync(PICKER_OPTIONS)
      : await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);
    if (result.canceled || result.assets.length === 0) return;
    await uploadAsset(result.assets[0]);
  };

  const startManual = () => {
    setForm(EMPTY_WARDROBE_FORM);
    setSource('manual');
    setStep('form');
  };

  const onSave = async () => {
    if (!form.imageUrl.trim()) {
      setError('Add a photo before saving.');
      return;
    }
    if (!form.subcategory.trim()) {
      setError('Add a name for this item.');
      return;
    }
    if (!form.category.trim()) {
      setError('Select a type (Top/Bottom/Outerwear/Dress/Shoes/Accessories).');
      return;
    }
    setBusy('save');
    setError(null);
    try {
      await api.post<WardrobeItemResponse>('/wardrobe', {
        ...formToPayload(form, { status: 'SAVED', source }),
      });
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save this item');
      setBusy(null);
    }
  };

  const setField = <K extends keyof WardrobeFormValue>(key: K, value: WardrobeFormValue[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Screen scroll>
      <View className="flex-row items-center px-5 pt-4 pb-2">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text className="text-xl text-ink px-1.5">‹</Text>
        </Pressable>
        <Text className="flex-1 -ml-4 text-center font-display text-2xl font-semibold text-ink">
          {step === 'choose' ? 'Add Clothing Item' : 'Add to Wardrobe'}
        </Text>
        <DrawerButton />
      </View>

      {step === 'choose' ? (
        <View className="px-6 pt-10">
          {(
            [
              { Icon: CameraIcon, label: 'Take Photo', onPress: () => pickPhoto(true), disabled: busy !== null },
              { Icon: GalleryIcon, label: 'Choose from Gallery', onPress: () => pickPhoto(false), disabled: busy !== null },
              { Icon: PencilIcon, label: 'Add Details Manually', onPress: startManual, disabled: busy !== null },
            ] as const
          ).map(({ Icon, label, onPress, disabled }) => (
            <Pressable
              key={label}
              onPress={onPress}
              disabled={disabled}
              className="mb-5 flex-row items-center rounded-2xl border border-line bg-surface/70 px-4 py-4 active:bg-surface-alt">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-surface-alt">
                <Icon />
              </View>
              <Text className="flex-1 pl-4 text-center text-[15px] text-ink">{label}</Text>
              <View className="w-11" />
            </Pressable>
          ))}

          {busy === 'upload' ? (
            <View className="mt-2 items-center gap-2 rounded-2xl border border-accent/40 bg-accent-soft p-5">
              <ActivityIndicator color="#E3C6A6" />
              <Text className="text-sm text-accent">Analyzing image and getting suggestions…</Text>
            </View>
          ) : null}

          {error ? <Text className="mt-2 text-center text-sm text-danger">{error}</Text> : null}

          <Text className="mt-24 text-center text-sm leading-6 text-muted">
            AI will automatically detect{'\n'}the type, color and style.
          </Text>
        </View>
      ) : (
        <View className="gap-4 px-5 pt-4">
          <View className="overflow-hidden rounded-2xl border border-line bg-surface">
            {form.imageUrl ? (
              <Image
                source={{ uri: form.imageUrl }}
                style={{ width: '100%', aspectRatio: 3 / 4 }}
                contentFit="cover"
                transition={150}
              />
            ) : (
              <View className="items-center justify-center" style={{ aspectRatio: 3 / 4 }}>
                <Text className="text-sm text-muted">No photo</Text>
              </View>
            )}
          </View>

          {busy === 'upload' ? (
            <View className="items-center gap-2 rounded-2xl border border-accent/40 bg-accent-soft p-4">
              <ActivityIndicator color="#E3C6A6" />
              <Text className="text-sm text-accent">Filling details from photo…</Text>
            </View>
          ) : null}

          <View className="gap-2">
            <Text className="text-sm font-medium text-ink">Type</Text>
            <View className="flex-row flex-wrap gap-2">
              {WARDROBE_CATEGORIES.map((option) => (
                <TypeChip
                  key={option.value}
                  label={option.label}
                  active={form.category === option.value}
                  onPress={() => setField('category', option.value)}
                />
              ))}
            </View>
          </View>

          <FormField
            label="Name"
            value={form.subcategory}
            onChangeText={(text) => setField('subcategory', text)}
            placeholder="e.g. Shirt"
            autoCapitalize="words"
          />
          <FormField
            label="Color"
            value={form.color}
            onChangeText={(text) => setField('color', text)}
            placeholder="e.g. Black"
            autoCapitalize="words"
          />
          <FormField
            label="Notes (optional)"
            value={form.notes}
            onChangeText={(text) => setField('notes', text)}
            placeholder="Add a short note..."
            multiline
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />

          {error ? <Text className="text-sm text-danger">{error}</Text> : null}

          <PrimaryButton
            label="Save"
            onPress={onSave}
            loading={busy === 'save'}
            disabled={busy !== null || !form.subcategory.trim() || !form.category.trim()}
          />
        </View>
      )}

      <View className="h-8" />
    </Screen>
  );
}
