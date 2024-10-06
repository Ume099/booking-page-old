import admin from 'firebase-admin';

export const ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // 改行を適切に処理
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const firestore = admin.firestore();
