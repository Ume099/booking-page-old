import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase/firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const items: any[] = [];

  const { collectionName } = req.query;
  if (!collectionName) {
    res.status(400).json({ message: 'collectionName is Missing', error: error.message });
  }

  try {
    const snapshot = await db.collection(String(collectionName)).get();
    snapshot.docs.forEach((doc) => items.push(doc));
    res.status(200).json(items);
  } catch (error: any) {
    console.error('開校日情報の取得に失敗しました:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
