import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { uid, displayName } = req.body;

  if (!uid || !displayName) {
    return res.status(400).json({ message: 'Bad Request: Missing parameters' });
  }

  try {
    const userRecord = await admin.auth().updateUser(uid, {
      displayName: displayName,
    });

    return res.status(200).json({ message: 'User updated successfully', user: userRecord });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
}
