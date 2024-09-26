import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

const serviceAccount = require('firebase-serviceAccount.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
    res.status(500).json({ error: error.message });
  }
}
