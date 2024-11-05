// pages/api/booking/updateDefaultClass.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase/firebase-admin';

const updateDefaultClass = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { uid, defaultClass, defaultDay } = req.body;
  if (!uid || !defaultClass || !defaultDay) {
    return res.status(400).json({ message: 'UID is required' });
  }

  try {
    const studentDocRef = db.collection('students').doc(uid);

    await studentDocRef.update({
      defaultClass,
      defaultDay,
    });

    res.status(200).json({
      message: `Successfully updated defaultClass to 'class4' for student with UID: ${uid}`,
    });
  } catch (error) {
    console.error('Error updating defaultClass:', error);
    res.status(500).json({ message: 'Failed to update defaultClass' });
  }
};

export default updateDefaultClass;
