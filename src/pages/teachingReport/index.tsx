import DatePicker from '@/components/common/parts/DatePicker';
import InputRadio from '@/components/common/parts/InputRadio';
import Select from '@/components/common/parts/Select';
import SelectObject from '@/components/common/parts/SelectObject';
import TextArea from '@/components/common/parts/TextArea';
import ToggleSwitch from '@/components/common/parts/ToggleSwitch';
import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { AuthGuard } from '@/feature/auth/component/AuthGuard/AuthGuard';
import {
  RIKAIDO_OBJ_LIST,
  stageList,
  TeachingReportTemplateInputType,
  TIME_OPTION_LIST,
} from '@/lib/teachingReport';
import { getUserEmail } from '@/lib/util/firebase/getUserEmail';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useForm, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

type ReportObj = {
  stageName: string;
  topic: string;
  detail: string;
};

type TeachingReportData = {
  studentUid: string;
  date: Date;
  classTime: string;
  stage: string;
  topic: string;
  detail: string;
  studentName: string;
  writer: string;
  writerUid: string;
  rikaido: string;
  comment: string;
  isPublished: boolean;
};

type UserData = {
  uid: string;
  name?: string;
  email?: string;
  displayName?: string;
};

const DEFAULT_REPORT_OBJ: ReportObj = {
  stageName: '',
  topic: '',
  detail: '',
};

// fetcher関数を定義
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TeachingExample: NextPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TeachingReportTemplateInputType>();
  const [userInfo] = useRecoilState<UserInfo>(userInfoState);
  const toast = useToast();
  const stage = watch('stage');

  // useSWRを使ってテンプレートデータをフェッチ
  const { data: reportObj = DEFAULT_REPORT_OBJ, error: templateError } = useSWR<ReportObj>(
    stage ? `/api/teachingReport/fetchTemplate?docId=stage${stage}` : null,
    fetcher,
  );

  // useSWRを使ってユーザーデータをフェッチ
  const { data: users, error: usersError } = useSWR<UserData[]>(
    '/api/userActions/fetchUsers',
    fetcher,
  );

  const getPostData = (data: TeachingReportTemplateInputType): TeachingReportData => {
    const dataObj: TeachingReportData = {
      date: data.date,
      classTime: data.classTime,
      stage: reportObj.stageName,
      topic: reportObj.topic,
      detail: reportObj.detail,
      studentUid: data.studentUid,
      studentName: String((users && users[1].displayName) || ''),
      writer: userInfo.userName || 'なし',
      writerUid: userInfo.uid,
      rikaido: data.rikaido,
      comment: data.comment || 'なし',
      isPublished: data.isPublished,
    };
    return dataObj;
  };

  const createTeachingReport = async (data: TeachingReportData) => {
    try {
      // エンドポイントに POST リクエストを送信
      const response = await axios.post('/api/teachingReport/createReport', data);

      if (response.status === 201) {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      console.error('Error while creating document:', error);
      return { success: false, message: 'An error occurred while creating the document.' };
    }
  };

  const sendMail = async (datas: TeachingReportTemplateInputType) => {
    let error = false;
    const sendTo = await getUserEmail(datas.studentUid);
    try {
      const res = await fetch('/api/teachingReport/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // name: datas.studentName,
          sendTo,
          year: datas.date.toLocaleString().split('-')[0],
          month: datas.date.toLocaleString().split('-')[1],
          day: datas.date.toLocaleString().split('-')[2],
          stage,
          topic: reportObj.topic,
          detail: reportObj.detail + datas.behavior,
        }),
      });
    } catch (e) {
      error = true;
      console.log(e);
    }

    if (!error) {
      toast({
        title: '発行メールを送信しました。',
        status: 'success',
        position: 'top-right',
      });
    } else {
      toast({
        title: 'メールの送信に失敗しました。',
        status: 'warning',
        position: 'top-right',
      });
    }
  };

  // 提出の関数
  const onSubmit = (data: TeachingReportTemplateInputType) => {
    if (!data.stage || !data.date) {
      toast({
        title: '必要事項を選択してください。',
        status: 'error',
        position: 'top',
      });
      return;
    }

    if (data.isPublished) {
      sendMail(data);
    }
    createTeachingReport(getPostData(data));
    // reset();
  };

  // エラーハンドリング
  if (templateError) {
    console.log('Error fetching template data:', templateError);
  }

  if (usersError) {
    console.log('Error fetching users:', usersError);
  }

  return (
    <AuthGuard>
      <div className="mx-12 mt-24 max-w-4xl items-center">
        {/* ユーザーデータの表示 */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6">
            <DatePicker label="授業日時" register={register('date')} withDefaultValue />
            <Select<string>
              label="時間"
              className="w-full"
              register={register('classTime')}
              optionList={TIME_OPTION_LIST}
            />
            <h2 className="font-bold">生徒</h2>
            {users ? (
              <SelectObject
                selectedIndex={1}
                register={register('studentUid')}
                optionObjList={users.map((user) => ({
                  value: user.uid,
                  optionName: user.displayName as string,
                }))}
              />
            ) : (
              <p>ユーザー情報を取得しています...</p>
            )}
          </div>
          {/* 報告するステージの選択ボタン */}
          <p className="h-8">選択してください。</p>
          <Select<string> optionList={stageList} className="w-full" register={register('stage')} />

          <InputRadio
            label="理解度"
            className="w-full"
            register={register('rikaido')}
            options={RIKAIDO_OBJ_LIST}
          />
          <div className="mt-4 font-bold">指導報告書の内容</div>
          <div className="border p-2">
            {stage ? (
              <div>
                <div>
                  【今日のステージ】
                  <p>#{reportObj.stageName}</p>
                </div>
                <div>
                  <p>【今日の授業内容】</p>
                  <p>・{reportObj.topic}</p>
                </div>
                <div>
                  <p>【今日の授業の詳細】</p>
                  <p>・{reportObj.detail}</p>
                  <TextArea placeholder="当日の様子を追加" register={register('behavior')} />
                </div>
              </div>
            ) : (
              <div>ステージを選択してください。</div>
            )}
            <TextArea label="コメント" register={register('comment')} />
            <Controller
              name="isPublished"
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <ToggleSwitch
                  label="公開"
                  isChecked={value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              )}
            />
          </div>
          <input className="rounded-lg border bg-primary px-3 py-2" type="submit" />
        </form>
      </div>
    </AuthGuard>
  );
};

export default TeachingExample;
