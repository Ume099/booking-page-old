// pages/api/cities.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// 型定義
type City = {
  cityCode: string;
  cityName: string;
  bigCityFlag: string;
};

type ApiResponse = {
  message?: string | null;
  result: City[];
};

// Next.js APIハンドラ
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // クエリから都道府県コードを取得
  const { prefCode } = req.query;

  // 都道府県コードが指定されていない場合のエラーハンドリング
  if (!prefCode || typeof prefCode !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing prefCode' });
  }

  try {
    // RESAS APIにリクエストを送信
    const response = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${encodeURIComponent(prefCode)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY || '',
        },
      },
    );

    // APIリクエストが成功したか確認
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch cities data' });
    }

    // データをJSON形式で取得
    const data: ApiResponse = await response.json();

    // RESAS APIのエラー応答をハンドリング
    if (data.message) {
      return res.status(400).json({ message: data.message });
    }

    // 市区町村データを返却
    res.status(200).json(data.result);
  } catch (error) {
    // 例外のキャッチとエラーレスポンス
    res.status(500).json({ message: 'Internal server error', error });
  }
}
