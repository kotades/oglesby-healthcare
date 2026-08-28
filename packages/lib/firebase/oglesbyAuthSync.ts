import {
  getOglesbyDoc,
  getOglesbyCollection,
  OGLESBY_NAMESPACE,
} from "./oglesbyFirebase";
import { setDoc, getDoc, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export interface OglesbyUserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: "ADMIN" | "USER" | "CONSULTANT";
  appNamespace: typeof OGLESBY_NAMESPACE;
  createdAt: any;
  updatedAt: any;
}

/**
 * Sync user profile to namespaced Firestore collection (/oglesby_healthcare/v1/users/{uid})
 * and record HIPAA audit trail in /oglesby_healthcare/v1/audit_logs.
 *
 * This function is intentionally fire-and-forget safe — it never throws,
 * so authentication flows are never blocked by Firestore connectivity issues.
 */
export async function syncOglesbyUserProfile(user: {
  uid: string;
  email: string;
  displayName?: string;
  role?: "ADMIN" | "USER" | "CONSULTANT";
}): Promise<void> {
  try {
    const userRef = getOglesbyDoc("users", user.uid);

    // Use setDoc with merge:true to avoid needing a getDoc read first.
    // This is both more resilient (fewer round-trips) and works even if
    // the document doesn't exist yet.
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
        role: user.role || "USER",
        appNamespace: OGLESBY_NAMESPACE,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (syncErr) {
    // Never block auth flow — log and continue
    console.warn("Oglesby Firebase profile sync skipped (non-blocking):", syncErr);
    return;
  }

  // Record HIPAA Audit Entry (best-effort, non-blocking)
  try {
    await addDoc(getOglesbyCollection("audit_logs"), {
      userId: user.uid,
      userEmail: user.email,
      action: "AUTH_PROFILE_SYNC",
      timestamp: serverTimestamp(),
      clientApp: OGLESBY_NAMESPACE,
      status: "SUCCESS",
    });
  } catch (auditErr) {
    console.warn("HIPAA Audit Logging skipped (non-blocking):", auditErr);
  }
}
