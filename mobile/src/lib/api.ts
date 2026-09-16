import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { ApiClientError, ApiError, NetworkError } from '@/types/api';
export type { ApiClientError, NetworkError } from '@/types/api';

function resolveBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(':')[0];

  if (host) {
    return `http://${host}:3000`;
  }

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return `http://${window.location.hostname}:3000`;
  }

  return 'http://localhost:3000';
}

export const API_BASE_URL = resolveBaseUrl();

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string | null;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new NetworkError('Cannot reach the Miori API. Is the backend running?');
  }

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
    throw new ApiClientError(response.status, message, Array.isArray(apiError?.message) ? apiError!.message : undefined);
  }

  return (await response.json()) as T;
}

export const api = {
  get<T>(path: string, token?: string | null) {
    return request<T>(path, { token });
  },
  post<T>(path: string, body?: unknown, token?: string | null) {
    return request<T>(path, { method: 'POST', body, token });
  },
};