"use client";

import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  type User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { oglesbyAuth, syncOglesbyUserProfile } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(oglesbyAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(oglesbyAuth, email, password);
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(oglesbyAuth, provider);
    await syncOglesbyUserProfile({
      uid: result.user.uid,
      email: result.user.email ?? "",
      name: result.user.displayName ?? undefined,
    });
  }

  async function register(email: string, password: string, name: string) {
    const result = await createUserWithEmailAndPassword(oglesbyAuth, email, password);
    await updateProfile(result.user, { displayName: name });
    await syncOglesbyUserProfile({
      uid: result.user.uid,
      email,
      name,
      role: "CLIENT",
    });
  }

  async function logout() {
    await signOut(oglesbyAuth);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(oglesbyAuth, email);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
