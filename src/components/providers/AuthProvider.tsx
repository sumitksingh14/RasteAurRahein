"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import AuthModal from "@/components/ui/AuthModal";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  /** Call after login/register to refresh user state */
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  /** Open the auth modal programmatically */
  openAuthModal: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
  openAuthModal: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setModalOpen(true);
  }, []);

  const openAuthModal = useCallback(() => setModalOpen(true), []);

  const [initialPromptDone, setInitialPromptDone] = useState(false);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Detect user login status on page load and load login page if not logged in
  useEffect(() => {
    if (!loading && !initialPromptDone) {
      if (!user) {
        setModalOpen(true);
      }
      setInitialPromptDone(true);
    }
  }, [loading, user, initialPromptDone]);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout, openAuthModal }}>
      {children}
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AuthContext.Provider>
  );
}
