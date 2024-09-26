import { ServiceAccount } from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { NextApiRequest, NextApiResponse } from 'next';

export const getBooking = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const COLLECTION_NAME = 'bookings';
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  }

  const db = getFirestore();
  // req.bodyの型
  type InsertDataType = {
    startTime: Date;
    timeRange: number;
  };

  if (req.method === 'GET') {
    try {
      const { bookingTime } = req.body;
      if (!bookingTime) {
        res.status(400).json({ error: 'body key is ,issing' });
        return;
      }

      const docRef = db.collection(COLLECTION_NAME).doc();
      const insertData: InsertDataType = {
        startTime: new Date(),
        // eslint-disable-next-line
        timeRange,
      };
      await docRef.set(insertData);
      res.status(200).json({ message: '書き換え成功！' });
    } catch (error) {
      res.status(500).json({ error: 'エラーが発生しました' });
    }
  } else {
    res.status(405).json({ error: 'not found' });
  }
};
