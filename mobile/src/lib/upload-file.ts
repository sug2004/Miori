import type { ImagePickerAsset } from 'expo-image-picker';
import { Platform } from 'react-native';

export interface UploadFilePayload {
  uri: string;
  name: string;
  type: string;
}

export function toUploadFile(asset: ImagePickerAsset): Blob | UploadFilePayload {
  if (Platform.OS === 'web' && asset.file) {
    return asset.file;
  }

  return {
    uri: asset.uri,
    name: asset.fileName ?? `image-${Date.now()}.jpg`,
    type: asset.mimeType ?? 'image/jpeg',
  };
}
