import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

type ReportObj = {
  stageName: string;
  topic: string;
  detail: string;
};

type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

// データオブジェクトの型
type TeachingReport = {
  id: string;
  rikaido: string;
  classTime: string;
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
    rikaido: '',
    classTime: '',
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

  // useSWRを使ってテンプレートデータをフェッチ
  const { data: reportObj = DEFAULT_REPORT_OBJ, error: templateError } = useSWR<TeachingReport[]>(
    userInfo.uid
      ? `/api/teachingReport/fetchTeachingReport?collectionName=teaching-report&studentUid=${userInfo.uid}`
      : null,
    fetcher,
  );

  useEffect(() => {
    if (reportObj && userInfo.uid) {
      const filteredReports = reportObj.filter(
        (report: TeachingReport) => report.studentUid === userInfo.uid,
      );
      setReportList(filteredReports);
      console.log('filteredReports', filteredReports);
    }
  }, [reportObj, userInfo.uid]);

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

  const getStarImage = (points: String): string => {
    switch (points) {
      case '1':
        return '/teachingReport/st1.png';
      case '2':
        return '/teachingReport/st2.png';
      case '3':
        return '/teachingReport/st3.png';
      case '4':
        return '/teachingReport/st4.png';
      case '5':
        return '/teachingReport/st5.png';
      case '6':
        return '/teachingReport/st6.png';
      case '7':
        return '/teachingReport/st7.png';
      case '8':
        return '/teachingReport/st8.png';
      case '9':
        return '/teachingReport/st9.png';
      case '10':
        return '/teachingReport/st10.png';
      default:
        return '';
    }
  };

  return (
    <div className="mx-12 max-w-4xl items-center">
      {/* ユーザーデータの表示 */}
      <div className="mt-6">
        <h2 className="mb-8 text-4xl font-bold">指導報告書</h2>

        <div className="border p-2">
          {/* reportListの表示 */}
          {reportList.length > 0 ? (
            reportList.map((report) => (
              <div key={report.id} className="border-b py-2">
                <p className="text-xl font-bold">〇授業時間</p>
                <p className="mb-4">{report.classTime || ''}</p>
                <p className="mb-2 text-xl  font-bold">〇理解度</p>
                <div className="mb-4">
                  <Image src={getStarImage(report.rikaido)} alt="pt1" width={248} height={128} />
                </div>
                <p className="text-xl font-bold">〇ステージ</p>
                <p className="mb-4 text-lg">{report.stage}</p>
                <p className="text-xl font-bold">〇内容</p>
                <p className="mb-4 text-lg">{report.topic}</p>
                <p className="text-xl font-bold">授業の詳細</p>
                <p className="mb-4">{report.detail}</p>
              </div>
            ))
          ) : (
            <p>報告書はありません。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowTeachingReport;
