import { db } from '@/lib/firebase/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
};

type FieldValue = {
  date: Date;
  classTime: string;
  createdAt: Date;
  stage: string;
  topic: string;
  detail: string;
  studentUid: string;
  studentName: string;
  writer: string;
  writerUid: string;
  isRead: boolean;
  rikaido: string;
  comment: string;
  isPublished: boolean;
};

type ReqBody = {
  date: Date;
  classTime: string;
  stage: string;
  topic: string;
  detail: string;
  studentUid: string;
  studentName: string;
  writer: string;
  writerUid: string;
  rikaido: string;
  comment: string;
  isPublished: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    date,
    classTime,
    stage,
    topic,
    detail,
    studentUid,
    studentName,
    writer,
    writerUid,
    rikaido,
    comment,
    isPublished,
  }: ReqBody = req.body;

  // バリデーション: 必須フィールドがすべて存在するかチェック
  if (
    !date ||
    !classTime ||
    !stage ||
    !topic ||
    !detail ||
    !studentUid ||
    !studentName ||
    !writer ||
    !writerUid ||
    !rikaido ||
    !comment
  ) {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  // fieldValue オブジェクトの作成
  const fieldValue: FieldValue = {
    createdAt: new Date(),
    date,
    stage,
    topic,
    detail,
    studentUid,
    studentName,
    writer,
    writerUid,
    isRead: false, // 初期値として未読に設定
    classTime,
    rikaido,
    comment,
    isPublished,
  };

  try {
    // teaching-report コレクションに新しいドキュメントを作成
    await db.collection('teaching-report').doc(`st_${studentUid}_${date}`).set(fieldValue);

    return res.status(201).json({ success: true, message: 'Document created successfully' });
  } catch (error) {
    console.error('Error creating document:', error);
    return res.status(500).json({ success: false, message: 'Failed to create document' });
  }
}
