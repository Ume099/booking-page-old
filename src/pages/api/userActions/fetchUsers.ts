import { auth } from '@/lib/firebase/firebase-admin';
import { FirebaseError } from 'firebase/app';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const listUsers = async (nextPageToken?: string) => {
      // List batch of users, 1000 at a time.
      const result = await auth.listUsers(1000, nextPageToken);
      return result.users;
    };

    const users = await listUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error listing users:', error);
    if (error instanceof FirebaseError) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(503).json({ message: 'Internal Server Error' });
    }
  }
}
