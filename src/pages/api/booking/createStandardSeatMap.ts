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
    docId,
    fieldName,
    newValue,
  }: {
    docId: string;
    fieldName: string;
    newValue: string[];
  } = req.body;

  if (!docId || !fieldName || !Array.isArray(newValue)) {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  try {
    const docRef = db.collection('standardSeatMap').doc(docId);
    await docRef.update({
      [fieldName]: newValue,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating document:', error);
    return res.status(500).json({ success: false, message: 'Failed to update document' });
  }
}
