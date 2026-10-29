import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { api } from '@/lib/api';
import { tokenStorage } from '@/lib/auth-storage';
import { PublicUser } from '@/types/api';

interface AuthContextValue {
  user: PublicUser | null;
  isReady: boolean;
  isRestoring: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string, gender?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (nextUser: PublicUser) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function restoreSession(): Promise<{ token: string; user: PublicUser } | null> {
  const token = await tokenStorage.getToken();
  if (!token) {
    return null;
  }
  try {
    const { user } = await api.get<{ user: PublicUser }>('/auth/me', token);
    return { token, user };
  } catch {
    await tokenStorage.deleteToken();
    return null;
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    restoreSession()
      .then((session) => {
        if (session) {
          setUser(session.user);
        }
      })
      .catch(() => {
        // Ignore: treat as not authenticated
      })
      .finally(() => setIsRestoring(false));
  }, []);

  const applyAuth = useCallback(async (token: string, nextUser: PublicUser) => {
    await tokenStorage.setToken(token);
    setUser(nextUser);
    setError(null);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { token, user } = await api.post<{ token: string; user: PublicUser }>(
          '/auth/login',
          { email, password },
        );
        await applyAuth(token, user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        throw err;
      }
    },
    [applyAuth],
  );

  const signUp = useCallback(
    async (email: string, password: string, displayName?: string, gender?: string) => {
      try {
        const { token, user } = await api.post<{ token: string; user: PublicUser }>(
          '/auth/signup',
          { email, password, displayName, gender },
        );
        await applyAuth(token, user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        throw err;
      }
    },
    [applyAuth],
  );

  const signOut = useCallback(async () => {
    await tokenStorage.deleteToken();
    setUser(null);
    setError(null);
  }, []);

  const updateUser = useCallback((nextUser: PublicUser) => {
    setUser(nextUser);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady: !isRestoring,
      isRestoring,
      error,
      signIn,
      signUp,
      signOut,
      updateUser,
      clearError,
    }),
    [user, isRestoring, error, signIn, signUp, signOut, updateUser, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}