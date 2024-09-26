// pages/api/removeUidFromClasses.ts
import { db } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { uid } = req.body;
  if (!uid) {
    return res.status(400).json({ message: 'UID is required' });
  }

  try {
    const collections = await db.listCollections();

    for (const collection of collections) {
      if (!collection.id.startsWith('openDay_')) continue; // 必要なコレクションのみを対象とする

      const documents = await collection.listDocuments();
      for (const docRef of documents) {
        const doc = await docRef.get();
        if (!doc.exists) continue;

        const data = doc.data();
        const fieldsToUpdate: Record<string, FieldValue> = {};

        for (let i = 1; i <= 7; i++) {
          const classField = `class${i}`;
          if (data[classField]?.includes(uid)) {
            fieldsToUpdate[classField] = FieldValue.arrayRemove(uid);
          }
        }

        if (Object.keys(fieldsToUpdate).length > 0) {
          await docRef.update(fieldsToUpdate);
        }
      }
    }

    res.status(200).json({ message: `UID ${uid} removed from all classes.` });
  } catch (error) {
    console.error('Error removing UID from classes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
