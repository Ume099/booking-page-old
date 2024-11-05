// pages/api/removeUidFromClasses.ts
import { db } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { uid, startDate } = req.body; // Expect date in format 'YYYY_MM_DD'
  if (!uid || !startDate) {
    return res.status(400).json({ message: 'UID and date are required' });
  }

  try {
    // `date` をパースして YYYY_MM と DD を抽出
    const [year, month, day] = startDate.split('_').map(Number);
    const targetYearMonth = `${year}_${String(month).padStart(2, '0')}`;
    const targetDay = day;

    const collections = await db.listCollections();

    for (const collection of collections) {
      // `openDay_YYYY_MM` の形式のコレクションをフィルタリング
      if (!collection.id.startsWith('openDay_')) continue;
      const collectionYearMonth = collection.id.replace('openDay_', '');

      // 対象コレクションか確認 (YYYY_MMが一致する場合のみ進む)
      if (collectionYearMonth !== targetYearMonth) continue;

      // `day_DD` ドキュメントを取得し、指定日付以降のドキュメントのみ処理
      const documents = await collection.listDocuments();
      for (const docRef of documents) {
        const docId = docRef.id;
        const docDay = parseInt(docId.replace('day_', ''), 10);

        // `day_DD` が targetDay 以降のドキュメントのみを対象とする
        if (docDay < targetDay) continue;

        const doc = await docRef.get();
        if (!doc.exists) continue;

        const data = doc.data();
        const fieldsToUpdate: Record<string, FieldValue> = {};

        // 各クラスフィールドからUIDを削除
        for (let i = 1; i <= 7; i++) {
          const classField = `class${i}`;
          if (data[classField]?.includes(uid)) {
            fieldsToUpdate[classField] = FieldValue.arrayRemove(uid);
          }
        }

        // 更新が必要な場合のみドキュメントを更新
        if (Object.keys(fieldsToUpdate).length > 0) {
          await docRef.update(fieldsToUpdate);
        }
      }
    }

    res
      .status(200)
      .json({ message: `UID ${uid} removed from all classes on or after ${startDate}.` });
  } catch (error) {
    console.error('Error removing UID from classes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
