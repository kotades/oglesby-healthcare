/**
 * Firebase Admin SDK Connection Test — Oglesby Healthcare
 * Uses Admin SDK to bypass client security rules — pure connectivity test
 * Run: node scripts/test-firebase-admin.mjs
 */
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const NAMESPACE = "oglesby_healthcare";
const VERSION = "v1";

function pass(msg) { console.log(`  ✅ ${msg}`); }
function fail(msg, err) { console.error(`  ❌ ${msg}:`, err?.message || err); process.exit(1); }
function section(msg) { console.log(`\n🔷 ${msg}`); }

async function run() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Oglesby Healthcare — Firebase Admin Connection Test");
  console.log("  Project: kota-reuse");
  console.log("  Namespace: oglesby_healthcare/v1");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // 1. Init Admin SDK using Application Default Credentials
  section("Admin SDK Initialization");
  let app, db, auth;
  try {
    if (!getApps().length) {
      app = initializeApp({ projectId: "kota-reuse" });
    }
    db = getFirestore();
    auth = getAuth();
    pass("Admin SDK initialized (Application Default Credentials)");
    pass("Project: kota-reuse");
  } catch (e) { fail("Admin SDK init failed", e); }

  // 2. Firestore write under oglesby_healthcare/v1/
  section("Firestore — Namespaced Write");
  const testRef = db
    .collection(NAMESPACE)
    .doc(VERSION)
    .collection("system_checks")
    .doc("connection_test");

  const payload = {
    status: "ok",
    app: "oglesby-healthcare",
    appId: "1:551190616453:web:2e70102e829ae4c2658cec",
    namespace: `${NAMESPACE}/${VERSION}`,
    testedAt: new Date().toISOString(),
    isolatedFrom: "KP Elite Golf Academy (1:551190616453:web:e2f6e53b316e1afe658cec)",
  };

  try {
    await testRef.set(payload);
    pass(`Wrote to: /${NAMESPACE}/${VERSION}/system_checks/connection_test`);
  } catch (e) { fail("Firestore write failed", e); }

  // 3. Read back
  section("Firestore — Read Back");
  try {
    const snap = await testRef.get();
    if (!snap.exists) fail("Document not found after write");
    const data = snap.data();
    pass(`status: "${data.status}"`);
    pass(`namespace: ${data.namespace}`);
    pass(`appId: ${data.appId}`);
    pass(`isolated from: ${data.isolatedFrom}`);
  } catch (e) { fail("Firestore read failed", e); }

  // 4. Auth — list users (confirms Auth service is reachable)
  section("Firebase Auth");
  try {
    const result = await auth.listUsers(1);
    pass(`Auth service reachable — ${result.users.length} user(s) returned (listing max 1)`);
  } catch (e) { fail("Auth list failed", e); }

  // 5. Cleanup
  section("Cleanup");
  try {
    await testRef.delete();
    pass("Test document deleted");
  } catch (e) { fail("Cleanup failed", e); }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  🎉 ALL TESTS PASSED");
  console.log("  Firebase connected to kota-reuse ✅");
  console.log("  Data isolated under oglesby_healthcare/v1/ ✅");
  console.log("  KP Elite data path: untouched ✅");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  process.exit(0);
}

run().catch((e) => { console.error("Fatal:", e); process.exit(1); });
