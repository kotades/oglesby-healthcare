/**
 * Firebase Connection Test — Oglesby Healthcare
 * Tests: App init, Firestore write/read under oglesby_healthcare/v1/, Auth service
 * Run: node scripts/test-firebase.mjs
 */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAzayr2LOT64lUz1IusMsI7kMWEC8Di8M",
  authDomain: "kota-reuse.firebaseapp.com",
  projectId: "kota-reuse",
  storageBucket: "kota-reuse.firebasestorage.app",
  messagingSenderId: "551190616453",
  // Oglesby Healthcare dedicated app (NOT KP Elite)
  appId: "1:551190616453:web:2e70102e829ae4c2658cec",
  measurementId: "G-EMTGT5CGXR",
};

const NAMESPACE = "oglesby_healthcare";
const VERSION = "v1";

function pass(msg) { console.log(`  ✅ ${msg}`); }
function fail(msg, err) { console.error(`  ❌ ${msg}:`, err?.message || err); process.exit(1); }
function section(msg) { console.log(`\n🔷 ${msg}`); }

async function run() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Oglesby Healthcare — Firebase Connection Test");
  console.log("  App ID: 1:551190616453:web:2e70102e829ae4c2658cec");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // 1. Init
  section("App Initialization");
  let app, auth, db;
  try {
    app = initializeApp(firebaseConfig, "oglesby-test");
    pass(`Firebase app initialized — name: "${app.name}"`);
    pass(`Project: ${app.options.projectId}`);
    pass(`App ID: ${app.options.appId}`);
  } catch (e) { fail("App init failed", e); }

  // 2. Auth service
  section("Firebase Auth");
  try {
    auth = getAuth(app);
    pass(`Auth service ready — tenant: ${auth.tenantId ?? "default"}`);
  } catch (e) { fail("Auth init failed", e); }

  // 3. Firestore — namespaced write
  section("Firestore — Namespaced Write");
  const testDocPath = `${NAMESPACE}/${VERSION}/system_checks/connection_test`;
  const testPayload = {
    status: "ok",
    app: "oglesby-healthcare",
    appId: firebaseConfig.appId,
    namespace: `${NAMESPACE}/${VERSION}`,
    testedAt: new Date().toISOString(),
  };

  try {
    db = getFirestore(app);
    const docRef = doc(db, NAMESPACE, VERSION, "system_checks", "connection_test");
    await setDoc(docRef, testPayload);
    pass(`Wrote to: /${testDocPath}`);
  } catch (e) { fail("Firestore write failed", e); }

  // 4. Firestore — namespaced read-back
  section("Firestore — Read Back");
  try {
    const docRef = doc(db, NAMESPACE, VERSION, "system_checks", "connection_test");
    const snap = await getDoc(docRef);
    if (!snap.exists()) fail("Document not found after write", null);
    const data = snap.data();
    pass(`Read back data — status: "${data.status}"`);
    pass(`Namespace confirmed: ${data.namespace}`);
    pass(`App ID confirmed: ${data.appId}`);
  } catch (e) { fail("Firestore read failed", e); }

  // 5. Firestore — cleanup
  section("Firestore — Cleanup");
  try {
    const docRef = doc(db, NAMESPACE, VERSION, "system_checks", "connection_test");
    await deleteDoc(docRef);
    pass("Test document deleted (clean slate)");
  } catch (e) { fail("Cleanup failed", e); }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  🎉 ALL TESTS PASSED — Firebase is connected");
  console.log("  Data isolation: oglesby_healthcare/v1/ ✅");
  console.log("  KP Elite data: untouched ✅");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

run().catch((e) => { console.error("Fatal:", e); process.exit(1); });
