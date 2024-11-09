import DatePicker from '@/components/common/parts/DatePicker';
import InputRadio from '@/components/common/parts/InputRadio';
import SelectObject from '@/components/common/parts/SelectObject';
import SettingHeading from '@/components/common/parts/SettingHeading';
import Select from '@/components/React-Hook-Form/Select';
import { BookingStatusObjReturn, getBookingStatusObj } from '@/lib/classInfo';
import { DAY_NAME, getDayOfWeek } from '@/lib/date';
import { CLASS_SELECT_LIST } from '@/lib/SeatMap';
import { UserData } from '@/lib/userSettings';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateList, setDateList] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);

  let bookingStatus: BookingStatusObjReturn | null;
  const toast = useToast();

  type InputType = {
    defaultDay: string;
    defaultClass: string;
    studentUid: string;
    changeFirstDate: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputType>();

  // useSWRを使ってユーザーデータをフェッチ
  const { data: users, error: usersError } = useSWR<UserData[]>(
    '/api/userActions/fetchUsers',
    fetcher,
  );

  const removeUidFromAllClasses = async (uid: string, startDate: string) => {
    console.log(startDate);
    try {
      const response = await axios.post('/api/booking/deleteUidFromAllOpenDaysAfterDate', {
        uid,
        startDate,
      });
      if (response.status === 200) {
        console.log(`Successfully removed UID ${uid} from all classes.`);
      }
    } catch (error) {
      console.log('fails');
      console.error('Error removing UID from classes:', error);
    }
  };

  const removeFromAllClassesWithUid = async (uid: string, startDate: string) => {
    await removeUidFromAllClasses(uid, startDate);
  };

  // 予約をセットする関数
  const setBooking = async (data: InputType) => {
    const startDay = String(data.changeFirstDate);
    const defaultDay = data.defaultDay.split('曜日')[0]; // 曜日を「土」「日」などに変換
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

          const additionalVal = data.studentUid;
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

  const formatDateToYearMonth = (date: string): string => {
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];
    return `${year}_${month}_${day}`;
  };

  const onSubmit = async (data: InputType) => {
    const uid = data.studentUid;
    const defaultDay = data.defaultDay;
    const defaultClass = data.defaultClass;
    const changeFirstDate = formatDateToYearMonth(data.changeFirstDate);
    if (!changeFirstDate || !defaultClass || !defaultDay || !uid) {
      console.log(changeFirstDate);
      return;
    }
    setIsLoading(true);
    if (!confirm('削除しますか？')) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    await removeFromAllClassesWithUid(data.studentUid, changeFirstDate);

    bookingStatus = null;
    if (bookingStatus) {
      console.log('bookingStatus is not null');
      return;
    }
    setIsLoading(true);

    // TODO: ユーザーデータの基本クラス情報を変更する関数
    await updateDefaultClass(data.studentUid, data.defaultClass, data.defaultDay);

    await setBooking(data);

    setError(false);
    setIsLoading(false);
    reset();
  };

  // studentのuidのdefaultClass and Dayをupdateする関数
  const updateDefaultClass = async (
    uid: string,
    defaultClass: string,
    defaultDay: string,
  ): Promise<void> => {
    try {
      const response = await axios.post('/api/booking/updateDefaultClass', {
        uid,
        defaultClass,
        defaultDay,
      });

      if (response.status === 200) {
        console.log(`Successfully updated defaultClass to 'class4' for student with UID: ${uid}`);
      } else {
        console.error('Failed to update defaultClass:', response.data);
      }
    } catch (error) {
      console.error('Error calling updateStudentClass API:', error);
    }
  };

  if (!users) {
    return <div>ロード中...</div>;
  }

  return (
    <div className="mt-48 flex justify-center">
      <div className="flex w-full flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SettingHeading label="生徒情報の設定" className="mb-4 text-4xl" />
          <SettingHeading label="生徒の名前" />

          <SelectObject
            register={register('studentUid')}
            optionObjList={users.map((user) => ({
              value: user.uid,
              optionName: user.displayName as string, // キャストしないと怒られる
            }))}
          />

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

          <DatePicker
            label="新しい予定の開始日"
            withDefaultValue
            register={register('changeFirstDate')}
          />

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
