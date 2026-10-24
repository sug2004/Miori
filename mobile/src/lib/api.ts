import Constants from 'expo-constants';
import { File, UploadType, type UploadResult } from 'expo-file-system';
import { Platform } from 'react-native';

import { tokenStorage } from './auth-storage';
import { ApiClientError, ApiError, NetworkError } from '@/types/api';
export type { ApiClientError, NetworkError } from '@/types/api';

const API_PREFIX = '/api';

function resolveBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, '');
  }

  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(':')[0];

  if (host) {
    return `http://${host}:3000${API_PREFIX}`;
  }

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return `http://${window.location.hostname}:3000${API_PREFIX}`;
  }

  return `http://localhost:3000${API_PREFIX}`;
}

export const API_BASE_URL = resolveBaseUrl();

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string | null;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let apiError: ApiError | undefined;
    try {
      apiError = (await response.json()) as ApiError;
    } catch {
      // Non-JSON error body — fall back to status text
    }
    const message = Array.isArray(apiError?.message)
      ? apiError!.message.join(', ')
      : (apiError?.message ?? response.statusText);
    throw new ApiClientError(
      response.status,
      message,
      Array.isArray(apiError?.message) ? apiError!.message : undefined,
    );
  }

  return (await response.json()) as T;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;
  const authToken = token ?? (await tokenStorage.getToken());

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new NetworkError(
      `Cannot reach the Miori API. Is the backend running? (${(err as Error)?.message ?? String(err)})`,
    );
  }

  return handleResponse<T>(response);
}

interface UploadFilePayload {
  uri: string;
  name: string;
  type: string;
}

async function upload<T>(path: string, file: UploadFilePayload | Blob): Promise<T> {
  const authToken = await tokenStorage.getToken();
  const headers: Record<string, string> = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  // Web: the picked asset is a real Blob/File — send it via multipart FormData.
  if (typeof Blob !== 'undefined' && file instanceof Blob) {
    const form = new FormData();
    form.append('file', file);

    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers,
        body: form,
      });
    } catch (err) {
      throw new NetworkError(
        `Cannot reach the Miori API. Is the backend running? (${(err as Error)?.message ?? String(err)})`,
      );
    }

    return handleResponse<T>(response);
  }

  // Native: stream the local file with expo-file-system's native multipart upload.
  const nativeFile = file as UploadFilePayload;
  let result: UploadResult;
  try {
    const source = new File(nativeFile.uri);
    const task = source.createUploadTask(`${API_BASE_URL}${path}`, {
      httpMethod: 'POST',
      uploadType: UploadType.MULTIPART,
      fieldName: 'file',
      mimeType: nativeFile.type,
      headers,
    });
    result = await task.uploadAsync();
  } catch (err) {
    throw new NetworkError(
      `Cannot reach the Miori API. Is the backend running? (${(err as Error)?.message ?? String(err)})`,
    );
  }

  if (result.status < 200 || result.status >= 300) {
    let apiError: ApiError | undefined;
    try {
      apiError = JSON.parse(result.body) as ApiError;
    } catch {
      // Non-JSON error body — fall back to status text
    }
    const message = Array.isArray(apiError?.message)
      ? apiError!.message.join(', ')
      : (apiError?.message ?? `Upload failed (${result.status})`);
    throw new ApiClientError(
      result.status,
      message,
      Array.isArray(apiError?.message) ? apiError!.message : undefined,
    );
  }

  return JSON.parse(result.body) as T;
}

export const api = {
  get<T>(path: string, token?: string | null) {
    return request<T>(path, { token });
  },
  post<T>(path: string, body?: unknown, token?: string | null) {
    return request<T>(path, { method: 'POST', body, token });
  },
  patch<T>(path: string, body?: unknown, token?: string | null) {
    return request<T>(path, { method: 'PATCH', body, token });
  },
  upload,
};