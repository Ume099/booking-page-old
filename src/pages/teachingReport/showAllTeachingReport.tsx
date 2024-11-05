import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

// データオブジェクトの型
type TeachingReport = {
  id: string;
  createdAt: FirestoreTimestamp;
  studentUid: string;
  stage: string;
  studentName: string;
  writerUid: string;
  isRead: boolean;
  topic: string;
  detail: string;
  writer: string;
};

const DEFAULT_REPORT_OBJ: TeachingReport[] = [
  {
    id: '',
    createdAt: { _seconds: 0, _nanoseconds: 0 },
    studentUid: '',
    stage: '',
    studentName: '',
    writerUid: '',
    isRead: false,
    topic: '',
    detail: '',
    writer: '',
  },
];

// fetcher関数を定義
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ShowTeachingReport: NextPage = () => {
  const [userInfo] = useRecoilState<UserInfo>(userInfoState);
  const [reportList, setReportList] = useState<TeachingReport[]>([]);
  const toast = useToast();

  // useSWRを使ってテンプレートデータをフェッチ;
  const { data: reportObj = DEFAULT_REPORT_OBJ, error: templateError } = useSWR<TeachingReport[]>(
    '/api/teachingReport/fetchAllTeachingReport',
    fetcher,
  );

  const test = async () => {
    try {
      const res = axios.get('/api/teachingReport/fetchAllTeachingReport');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!reportObj) return;
    if (reportObj) {
      const filteredReports = reportObj;
      setReportList(filteredReports);
    }
  }, [reportObj]);

  useEffect(() => {
    if (templateError) {
      toast({
        title: 'データ取得エラー',
        description: '指導報告書のデータ取得に失敗しました。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [templateError]);

  const formatDate = (timestamp: FirestoreTimestamp) => {
    const milliseconds = timestamp._seconds * 1000; // 秒をミリ秒に変換
    return new Date(milliseconds).toLocaleString(); // ローカル形式の日付文字列に変換
  };

  return (
    <div className="mx-12 mt-24 max-w-4xl items-center">
      {/* ユーザーデータの表示 */}
      <div className="mt-6">
        <h2 className="font-bold">指導報告書</h2>

        <div className="mt-4 font-bold">指導報告書の内容</div>
        <div className="border p-2 text-black">
          {/* reportListの表示 */}
          {reportList.length > 0 ? (
            reportList.map((report) => (
              <div key={report.id} className="border-b py-2 text-white">
                <h3 className="font-semibold">{formatDate(report.createdAt)}</h3>
                <h3 className="font-semibold">{report.stage}</h3>
                <h3 className="font-semibold">{report.topic}</h3>
                <p>{report.detail}</p>
              </div>
            ))
          ) : (
            <p>報告書はありません。</p>
          )}
        </div>
      </div>
      <ButtonOriginal label="test" onClick={() => test()} />
    </div>
  );
};

export default ShowTeachingReport;
