// pages/api/updateClass.ts
import { db } from '@/lib/firebase/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    collectionName,
    docId,
    fieldName,
    newVal,
  }: {
    collectionName: string;
    docId: string;
    fieldName: string;
    newVal: string[];
  } = req.body;

  if (!collectionName || !docId || !fieldName || !Array.isArray(newVal)) {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.update({
      [fieldName]: newVal,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating document:', error);
    return res.status(500).json({ success: false, message: 'Failed to update document' });
  }
}
