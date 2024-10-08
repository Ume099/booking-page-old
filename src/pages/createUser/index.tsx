import CheckboxGroup from '@/components/common/parts/CheckboxGroup';
import DatePicker from '@/components/common/parts/DatePicker';
import Input from '@/components/common/parts/Input';
import InputRadio from '@/components/common/parts/InputRadio';
import Select from '@/components/common/parts/Select';
import SettingHeading from '@/components/common/parts/SettingHeading';
import TextArea from '@/components/common/parts/TextArea';
import { BookingStatusObjReturn, getBookingStatusObj } from '@/lib/classInfo';
import { DAY_NAME, getDayOfWeek } from '@/lib/date';
import { CLASS_SELECT_LIST } from '@/lib/SeatMap';
import {
  ABILITY_LIST,
  BIRTH_DATE,
  BIRTH_MONTH,
  BIRTH_YEAR_LIST,
  CURRENT_GRADE_LIST,
  DUMMY_GROUPS,
  GENDER_OBJ_LIST,
  InputType,
  PAYMENT_LIST,
  PERIOD_OBJ_LIST,
  PREFECTURES,
  SCHOOL_DIVISION_OBJ_LIST,
  STUDENT_CLASSIFICATION_LIST,
  SUBJECT_LIST,
} from '@/lib/userSettings';
import { generateRandomString } from '@/lib/util/createUser';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import { useLayoutEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

export const Page = () => {
  const [cityList, setCityList] = useState(['-']);
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateList, setDateList] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);

  let bookingStatus: BookingStatusObjReturn | null;

  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputType>();

  // この関数はコンポーネントが最初にマウントされた時に一回だけ実行されます
  const initializeMail = (uid: string) => {
    const DUMMY_EMAIL_HEAD = 'test+';
    const DUMMY_EMAIL_FOOT = '@tmail.com';

    const DUMMY_EMAIL = DUMMY_EMAIL_HEAD + uid + DUMMY_EMAIL_FOOT;
    setEmail(DUMMY_EMAIL);
  };

  // ユーザーidを生成する関数
  const initializer = () => {
    const uidParams = generateRandomString(12);

    setUid(uidParams);
    initializeMail(uidParams);
    setPassword(uidParams);
  };

  useLayoutEffect(() => {
    initializer();
  }, []);

  // アカウント作成
  const createAccount = async (data: InputType) => {
    try {
      const response = await fetch('/api/userActions/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          email,
          password,
          displayName: data.studentName,
        }),
      });
      if (response.status !== 200 && response.status !== 304) {
        throw error;
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('createAccount(),/api/userActions/createUser', error);
      }
      setError(true);
    }
  };

  // DBにユーザー情報を登録し、成功したらユーザー作成、する関数
  const postUserData = async (data: InputType) => {
    try {
      setError(false);
      const response = await fetch('/api/userActions/setStudentInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          uid,
        }),
      });
      if (response.status !== 200 && response.status !== 304) {
        throw error;
      }
    } catch (e) {
      console.log('ostUserData(), /api/userActions/setStudentInfo', error);
      setError(true);
      if (e instanceof FirebaseError) {
        toast({
          title: 'firebaseエラーが発生しました。' + String(e),
          status: 'error',
          position: 'top',
        });
      } else {
        toast({
          title: '原因不明のエラーが発生しました。',
          status: 'error',
          position: 'top',
        });
      }
    }
  };

  // 予約状況を更新する関数
  const updateClass = async (
    year: number,
    month: number,
    day: number,
    fieldName: string,
    newVal: string[],
  ) => {
    try {
      const response = await fetch('/api/booking/updateClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName: `openDay_${year}_${month}`,
          docId: `day_${day}`,
          fieldName: fieldName,
          newVal,
        }),
      });
      if (response.status !== 200 && response.status !== 304) {
        throw error;
      }
    } catch (error) {
      console.error('Failed:updateClass(), /api/booking/updateClass', error);
    }
  };

  // 予約状況を更新する関数
  const updateStandardSeatMap = async (
    dayOfWeek: string,
    fieldName: string,
    newValue: string[],
  ) => {
    let day;
    switch (dayOfWeek) {
      case '土':
        day = 'sat';
        break;
      case '日':
        day = 'sun';
        break;
      case '月':
        day = 'mon';
        break;
      case '火':
        day = 'tue';
        break;
      case '水':
        day = 'wed';
        break;
      case '木':
        day = 'thu';
        break;
      case '金':
        day = 'fri';
        break;
      default:
        day = null;
        break;
    }
    if (!day) {
      return;
    }

    try {
      const response = await fetch('/api/booking/updateStandardSeatMap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docId: day,
          fieldName,
          newValue,
        }),
      });
      if (response.status !== 200 && response.status !== 304) {
        throw error;
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const getAllOpenDates = async (year: number, month: number) => {
    setDateList([]);
    setIsLoading(true);

    // 開校日をすべて取得する
    let shouldFetch = true;

    while (shouldFetch) {
      const collectionName = `openDay_${year}_${month}`;
      console.log(collectionName);

      try {
        const response = await axios.get('/api/booking/fetchOpenDays', {
          params: { collectionName },
        });
        if (response.status !== 200 && response.status !== 304) {
          throw error;
        }

        const dates = response.data.map((fields: any) => fields._fieldsProto.date?.integerValue);

        // 取得した dates の長さを確認し、空ならループを終了する
        if (dates.length === 0) {
          shouldFetch = false;
        } else {
          // dates が空でなければリストに追加
          const fullDates = { year, month, dates };
          setDateList((prev) => [...prev, fullDates]);

          // 次の月のデータを取得するために month をインクリメント
          month++;
          if (month > 12) {
            month = 1;
            year++;
          }
        }
      } catch (error) {
        // エラーが発生した場合もループを終了する
        toast({ title: String(error), status: 'error', position: 'top' });
        shouldFetch = false;
      }
    }

    setIsLoading(false);
  };

  // 特定の日の予約状況を取得する関数
  const getBookingStatus = async (year: number, month: number, day: number) => {
    try {
      const response = await axios.get('/api/booking/fetchSeatMap', {
        params: { collectionName: `openDay_${year}_${month}`, docId: `day_${day}` },
      });
      bookingStatus = getBookingStatusObj(response.data._fieldsProto);
      console.log('setBookingStatus>>', bookingStatus);
    } catch (error) {
      console.log('/api/booking/fetchSeatMap', 'getBookingStatus()', error);
    }
  };

  // 予約をセットする関数
  const setBooking = async (data: InputType) => {
    const startDay = String(data.classStardDate);
    const defaultDay = data.defaultDay.split('曜日')[0];
    const defaultClass = data.defaultClass;

    if (!defaultDay || !defaultClass) {
      return; // 何もしない
    }

    await getAllOpenDates(Number(startDay.split('-')[0]), Number(startDay.split('-')[1]));

    for (let date of dateList) {
      if (!date.dates) {
        console.log('n.dates is missing');
        return; // 何もしない
      }

      for (let m of date.dates) {
        console.log(date.year, date.month, m, getDayOfWeek(date.year, date.month, m), defaultDay);
        if (getDayOfWeek(date.year, date.month, m) === defaultDay) {
          await getBookingStatus(date.year, date.month, m);

          const additionalVal = uid;
          let newVal: string[];

          if (!bookingStatus) {
            return; // 何もしない
          }

          console.log(bookingStatus, '<<<<bookingStatus');

          switch (defaultClass) {
            case 'class1':
              newVal = bookingStatus.class1.filter((val) => val !== '');
              break;
            case 'class2':
              newVal = bookingStatus.class2.filter((val) => val !== '');
              break;
            case 'class3':
              newVal = bookingStatus.class3.filter((val) => val !== '');
              break;
            case 'class4':
              newVal = bookingStatus.class4.filter((val) => val !== '');
              break;
            case 'class5':
              newVal = bookingStatus.class5.filter((val) => val !== '');
              break;
            case 'class6':
              newVal = bookingStatus.class6.filter((val) => val !== '');
              break;
            case 'class7':
              newVal = bookingStatus.class7.filter((val) => val !== '');
              break;
            default:
              console.log('default');
              newVal = ['default'];
              break;
          }
          if ((!newVal && !additionalVal) || newVal[0] === 'default') {
            console.log('newVal is missing');
            return; // 何もしない
          }

          newVal = [...newVal, additionalVal];
          console.log('newVal', newVal);

          // 取得した開校日の基本曜日の基本時間にuidを追加
          await updateClass(date.year, date.month, m, defaultClass, newVal);

          await updateStandardSeatMap(defaultDay, defaultClass, newVal);
        }
      }
    }
  };

  const resetFormStatus = () => {
    setError(false);
    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    bookingStatus = null;
    if (bookingStatus) {
      console.log('bookingStatus is not null');
      return;
    }
    setIsLoading(true);
    if (!data.studentName) {
      toast({ title: '必須事項が入力されていません。', status: 'error', position: 'bottom' });
      setIsLoading(false);
      return; // 何もしない
    }

    initializer();
    await postUserData(data);

    if (error) {
      resetFormStatus();
      return;
    }

    await createAccount(data);

    if (error) {
      resetFormStatus();
      return;
    }

    await setBooking(data);

    resetFormStatus();
    //reset();
  };

  return (
    <div className="mt-48 flex justify-center">
      <div className="flex w-full flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SettingHeading label="生徒情報の設定" className="mb-4 text-4xl" />
          <SettingHeading label="生徒の名前" />

          <Input label="氏名" isRequired className="w-full" register={register('studentName')} />
          <Input
            label="氏名（フリガナ）"
            className="w-full"
            register={register('studentNameFurigana')}
          />

          <p className="mt-4">表示される名前</p>

          <Select<string>
            optionList={CURRENT_GRADE_LIST}
            label="現在の学年"
            className="w-full"
            register={register('currentGrade')}
          />
          <Select<string>
            optionList={STUDENT_CLASSIFICATION_LIST}
            label="生徒区分"
            className="w-full"
            register={register('studentClassification')}
          />

          <InputRadio
            label="性別"
            className="w-full"
            register={register('gender')}
            options={GENDER_OBJ_LIST}
          />

          <p>生年月日</p>
          <div className="flex">
            <Select<number>
              optionList={BIRTH_YEAR_LIST}
              className="w-full"
              register={register('birthYear')}
            />
            <p className="mr-4 flex items-center">年</p>

            <Select<number>
              optionList={BIRTH_MONTH}
              className="w-full"
              register={register('birthMonth')}
            />
            <p className="mr-4 flex items-center">月</p>

            <Select<number>
              optionList={BIRTH_DATE}
              className="w-full"
              register={register('birthDate')}
            />
            <p className="flex items-center">日</p>
          </div>

          <SettingHeading label="生徒の予約管理" />
          <Select<string>
            optionList={DAY_NAME}
            label="基本曜日"
            className="w-full"
            register={register('defaultDay')}
          />
          <InputRadio
            options={CLASS_SELECT_LIST}
            label="基本クラス"
            className="w-full"
            register={register('defaultClass')}
          />
          <DatePicker label="授業開始日" withDefaultValue register={register('classStardDate')} />
          <DatePicker label="退会日" register={register('exitDate')} />
          <p>授業開始日と退会日は記録用です。生徒削除は「生徒管理」ページから行えます。</p>
          <input
            disabled={isLoading}
            className={`rounded-lg border bg-primary px-3 py-2 ${isLoading && 'opacity-40'}`}
            type="submit"
          />
          {uid}

          <SettingHeading label="保護者の連絡先" />

          <p className="mb-2 mt-4">主な電話番号</p>
          <div className="flex gap-2">
            <div className="w-1/3">
              <Input label="持ち主" className="w-full" register={register('mainPhoneHolder')} />
            </div>
            <Input
              label="メイン電話番号（ハイフンなし）"
              className="w-full"
              register={register('mainPhoneNumber')}
            />
          </div>
          <p className="mb-2 mt-4">他の電話番号</p>

          <div className="flex gap-2">
            <div className="w-1/3">
              <Input label="持ち主" className="w-full" register={register('subPhoneHolder')} />
            </div>
            <Input
              label="サブ電話番号（ハイフンなし）"
              className="w-full"
              register={register('subPhoneNumber')}
            />
          </div>

          <Input label="郵便番号" className="w-full" register={register('zipCode')} />

          <Select<string>
            label="都道府県"
            optionList={PREFECTURES}
            className="w-full"
            register={register('toDoHuKen')}
          />

          <Input
            label="住所"
            placeholder="番地まで"
            className="w-full"
            register={register('toBanchi')}
          />

          <Input
            label="住所2"
            placeholder="建物名と号室"
            className="w-full"
            register={register('toBanchi')}
          />

          <SettingHeading label="兄弟情報" />
          <Input
            label="兄弟"
            placeholder="生徒IDを入力してください。"
            className="w-full"
            register={register('broOrSisUid')}
          />

          <SettingHeading label="保護者情報" />

          <Input label="保護者：名" className="w-full" register={register('guardianName')} />
          <Input
            label="保護者：氏（フリガナ）"
            className="w-full"
            register={register('guardianNameFurigana')}
          />
          <Input label="勤務先" className="w-full" register={register('workPlace')} />
          <Input label="勤務先電話番号" className="w-full" register={register('workPhoneNumber')} />
          <Input label="緊急連絡先" className="w-full" register={register('emergencyContact')} />
          <Input
            label="緊急連絡先電話番号"
            className="w-full"
            register={register('emergencyPhoneNumber')}
          />

          <SettingHeading label="受講科目" />
          <CheckboxGroup
            label="受講科目"
            register={register}
            name="subjects"
            optionList={SUBJECT_LIST}
          />
          <Select<string>
            label="学力レベル"
            optionList={ABILITY_LIST}
            className="w-full"
            register={register('ability')}
          />
          <h2 className="mb-2 text-xl font-bold">学校情報登録</h2>

          <InputRadio
            label="学校区分"
            className="w-full"
            register={register('schoolDivision')}
            options={SCHOOL_DIVISION_OBJ_LIST}
          />

          <Select<string>
            label="都道府県"
            optionList={PREFECTURES}
            className="w-full"
            register={register('schoolToDoHuKen')}
          />

          <Select<string>
            label="市区町村"
            optionList={cityList}
            className="w-full"
            register={register('schoolCity')}
          />

          <Input label="学校名" className="w-full" register={register('schoolName')} />

          <InputRadio
            label="学期制"
            className="w-full"
            register={register('period')}
            options={PERIOD_OBJ_LIST}
          />
          <Select<string>
            label="グループ"
            optionList={DUMMY_GROUPS}
            className="w-full"
            register={register('group')}
          />
          <Select<string>
            label="支払方法"
            optionList={PAYMENT_LIST}
            className="w-full"
            register={register('payment')}
          />

          <TextArea label="備考" register={register('note')} />
          <input
            disabled={isLoading}
            className={`rounded-lg border bg-primary px-3 py-2 ${isLoading && 'opacity-40'}`}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
