import { db } from '@/lib/firebase/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
};

type NewVal = {
  stageName: string;
  topic: string;
  detail: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    docId,
    newVal,
  }: {
    docId: string;
    newVal: NewVal;
  } = req.body;

  if (!docId || !newVal) {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  try {
    const docRef = db.collection('teaching-report-template').doc(docId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      // If the document exists, update it
      await docRef.update(newVal);
      return res.status(200).json({ success: true, message: 'Document updated successfully' });
    } else {
      // If the document does not exist, create a new one
      await docRef.set(newVal);
      return res.status(201).json({ success: true, message: 'Document created successfully' });
    }
  } catch (error) {
    console.error('Error handling document:', error);
    return res.status(500).json({ success: false, message: 'Failed to handle document' });
  }
}
