import admin from 'firebase-admin';
import serviceAccount from '/firebase-serviceAccount.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const firestore = admin.firestore();
