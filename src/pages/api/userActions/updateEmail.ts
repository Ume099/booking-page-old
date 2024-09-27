// pages/api/userActions/updateEmail.ts
import { auth } from '@/lib/firebase/firebase-admin'; // Firebase Admin SDKのインスタンス
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { uid, newEmail } = req.body;

  // UIDや新しいメールアドレスが提供されているかを確認
  if (!uid || !newEmail) {
    return res.status(400).json({ message: 'UID and new email are required' });
  }

  try {
    // UIDを持つユーザーのメールアドレスを管理者権限で更新
    await auth.updateUser(uid, { email: newEmail });

    return res.status(200).json({ message: 'Email updated successfully' });
  } catch (error: any) {
    console.error('Error updating email: ', error);
    return res.status(500).json({ message: 'Error updating email', error: error.message });
  }
}
