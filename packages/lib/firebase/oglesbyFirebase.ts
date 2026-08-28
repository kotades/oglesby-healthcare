import process from "node:process";
import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { connectStorageEmulator, getStorage, ref } from "firebase/storage";

// Oglesby Healthcare Strict Namespace Identifier
export const OGLESBY_NAMESPACE = "oglesby_healthcare";
export const OGLESBY_VERSION = "v1";

// Firebase Client Web Config for 'kota-reuse' project
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCAzayr2LOT64lUz1IusMsI7kMWEC8Di8M",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "kota-reuse.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kota-reuse",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kota-reuse.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "551190616453",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:551190616453:web:e2f6e53b316e1afe658cec",
  measurementId: "G-PVGN0389BD",
};

// Initialize Firebase App Singleton
export const oglesbyFirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const oglesbyAuth = getAuth(oglesbyFirebaseApp);
export const oglesbyDb = getFirestore(oglesbyFirebaseApp);
export const oglesbyStorage = getStorage(oglesbyFirebaseApp);

/**
 * Get Namespaced Collection Path
 * Ensures all Oglesby Healthcare Firestore data lives exclusively inside /oglesby_healthcare/v1/<collectionName>
 * preventing data collisions with other apps sharing 'kota-reuse'.
 */
export function getOglesbyCollectionPath(collectionName: string): string {
  return `${OGLESBY_NAMESPACE}/${OGLESBY_VERSION}/${collectionName}`;
}

/**
 * Get Namespaced Firestore Collection Reference
 */
export function getOglesbyCollection(collectionName: string) {
  return collection(oglesbyDb, OGLESBY_NAMESPACE, OGLESBY_VERSION, collectionName);
}

/**
 * Get Namespaced Firestore Document Reference
 */
export function getOglesbyDoc(collectionName: string, docId: string) {
  return doc(oglesbyDb, OGLESBY_NAMESPACE, OGLESBY_VERSION, collectionName, docId);
}

/**
 * Get Namespaced Cloud Storage Reference Path
 * Prevents file collisions by forcing all uploads under: oglesby_healthcare/<environment>/<category>/<id>/<fileName>
 */
export function getOglesbyStoragePath(
  category: "users" | "consultations" | "intake_forms" | "avatars" | "documents",
  id: string,
  fileName: string
): string {
  const env = process.env.NODE_ENV || "development";
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9_.-]/g, "_");
  return `${OGLESBY_NAMESPACE}/${env}/${category}/${id}/${sanitizedFileName}`;
}

/**
 * Storage Reference Helper
 */
export function getOglesbyStorageRef(
  category: "users" | "consultations" | "intake_forms" | "avatars" | "documents",
  id: string,
  fileName: string
) {
  const path = getOglesbyStoragePath(category, id, fileName);
  return ref(oglesbyStorage, path);
}

/**
 * Sync Oglesby User Profile in Namespaced Firestore
 */
export async function syncOglesbyUserProfile(data: {
  uid: string;
  email: string;
  name?: string;
  role?: string;
}) {
  const userDoc = getOglesbyDoc("users", data.uid);
  await setDoc(
    userDoc,
    {
      email: data.email,
      ...(data.name ? { name: data.name } : {}),
      role: data.role || "CLIENT",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
