import { db } from '@/lib/firebase/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { collectionName } = req.query;

  if (!collectionName) {
    res.status(400).json({ message: 'collectionName is missing' });
    return;
  }
  try {
    const collectionRef = db.collection(String(collectionName));
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No documents found' });
    }

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ error: 'Failed to fetch documents' });
  }
}
