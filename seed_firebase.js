const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const NAMESPACE = 'oglesby_healthcare';
const VERSION = 'v1';

async function seedData() {
  const usersRef = db.collection(`${NAMESPACE}/${VERSION}/users`);
  const consultationsRef = db.collection(`${NAMESPACE}/${VERSION}/consultations`);
  
  console.log("Seeding practitioners...");
  const practitioners = [
    {
      uid: 'practitioner_1',
      email: 'dr.smith@oglesbyhealthcare.com',
      displayName: 'Dr. Sarah Smith',
      role: 'CONSULTANT',
      specialty: 'Cardiology',
      appNamespace: NAMESPACE,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      uid: 'practitioner_2',
      email: 'dr.jones@oglesbyhealthcare.com',
      displayName: 'Dr. Mike Jones',
      role: 'CONSULTANT',
      specialty: 'Neurology',
      appNamespace: NAMESPACE,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      uid: 'practitioner_3',
      email: 'emily.nurse@oglesbyhealthcare.com',
      displayName: 'Emily Davis, NP',
      role: 'CONSULTANT',
      specialty: 'Primary Care',
      appNamespace: NAMESPACE,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ];

  for (const doc of practitioners) {
    await usersRef.doc(doc.uid).set(doc, { merge: true });
    console.log(`Added ${doc.displayName}`);
  }

  console.log("Seeding dummy bookings...");
  const bookings = [
    {
      patientId: 'dummy_patient_1',
      patientName: 'John Doe',
      consultantId: 'practitioner_1',
      consultantName: 'Dr. Sarah Smith',
      date: new Date(Date.now() + 86400000).toISOString(),
      status: 'CONFIRMED',
      type: 'Initial Consultation',
      appNamespace: NAMESPACE,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    {
      patientId: 'dummy_patient_2',
      patientName: 'Jane Smith',
      consultantId: 'practitioner_3',
      consultantName: 'Emily Davis, NP',
      date: new Date(Date.now() + 172800000).toISOString(),
      status: 'PENDING',
      type: 'Follow-up',
      appNamespace: NAMESPACE,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }
  ];

  for (const booking of bookings) {
    await consultationsRef.add(booking);
    console.log(`Added booking for ${booking.patientName}`);
  }

  console.log("Data seeding complete!");
}

seedData().catch(console.error).finally(() => process.exit(0));
