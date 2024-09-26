import { auth, db } from '@/lib/firebase/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { uid } = req.body;

  if (!uid) {
    res.status(400).json({ message: 'UID is required' });
    return;
  }

  try {
    // Firebase Authentication からユーザーを削除
    await auth.deleteUser(uid);

    // db の "students" コレクションから uid に一致するドキュメントを削除
    await db.collection('students').doc(uid).delete();

    res.status(200).json({ message: 'User and student record successfully deleted' });
  } catch (error) {
    console.error('Error deleting user or student record:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
