import { ServiceAccount } from '@/lib/firebase/firebase-admin';
import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const { uid, email, password, displayName } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      uid: uid,
      email: email,
      password: password,
      displayName: displayName,
    });

    res.status(200).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
