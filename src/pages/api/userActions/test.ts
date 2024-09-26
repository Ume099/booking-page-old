import type { NextApiRequest, NextApiResponse } from 'next';
import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '/firebase-serviceAccount.json'; // 正しいパスに修正

// 初期化部分を修正
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    DummyEmail,
    biko,
    defaultPass,
    educationStage,
    uid,
    name,
    family,
    grade,
    standardDay,
    seatNumber,
    standardClass,
  } = req.body;
  const COLLECTION_NAME = 'users';

  if (req.method === 'POST') {
    try {
      const docRef = db.collection(COLLECTION_NAME).doc('uid');
      const insertData = {
        AUTHORITY: 'student',
        DummyEmail,
        biko,
        defaultPass,
        educationStage,
        uid,
        name,
        family,
        grade,
        standardDay,
        seatNumber,
        standardClass,
      };
      await docRef.set(insertData);
      return res.status(200).json({ message: 'Document successfully written!' });
    } catch (error) {
      console.error('Error writing document: ', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
