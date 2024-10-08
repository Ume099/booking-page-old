import { db } from '@/lib/firebase/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { collectionName, docId } = req.query;
  if (!collectionName || !docId) {
    res.status(400).json({ message: 'collectionName is Missing' });
  }

  try {
    const docRef = db.collection(String(collectionName)).doc(String(docId));
    const item = await docRef.get();
    if (!item.exists) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error: any) {
    console.error('開校日情報の取得に失敗しました:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
