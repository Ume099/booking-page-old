import { db } from '@/lib/firebase/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { docId, fieldName } = req.query;

  if (!docId || !fieldName) {
    res.status(400).json({ message: 'Request query parameters are missing.' });
    return;
  }

  try {
    const docRef = db.collection('teaching-report-template').doc(String(docId));
    const item = await docRef.get();

    if (!item.exists) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    const data = item.data();
    const fieldValue = data?.[String(fieldName)];

    if (fieldValue === undefined) {
      res.status(404).json({ message: 'Field not found in the document' });
      return;
    }

    res.status(200).json({ fieldValue });
  } catch (error: any) {
    console.error('Failed to retrieve field value:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
