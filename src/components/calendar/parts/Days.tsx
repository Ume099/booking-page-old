// components/Days.tsx
// TODO: この画面を修正する
import dayjs from 'dayjs';

import ButtonOriginal from '@/components/common/parts/ButtonOriginal';

import { getClassListFormatted, getDayOfWeekEng } from '@/lib/date';

import { SetStateAction, useEffect, useMemo, useState } from 'react';

import { bookingChangeState } from '@/hooks/atom/bookingChange';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { getDateByUID } from '@/lib/SeatMap';
import { BookedClassInfoListObj, packBookedClassInfo } from '@/lib/userSettings';
import { useToast } from '@chakra-ui/react';
import ClassSelectModalModal from './ClassSelectModal';

export type StudentClassInfo = {
  standardClass: string;
  standardDay: string;
};

type Props = {
  year: number;
  month: number;
  handleCloseModal?: () => void;
};

const Days = (props: Props) => {
  const { year, month } = props;
  const [openDaysObjList, setOpenDaysObjList] = useState<any[]>([]);
  const today = dayjs();
  const firstDayOfMonth = dayjs(new Date(year, month - 1, 1));
  const startDay = firstDayOfMonth.day();
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const [isOpenSetClassModal, setIsOpenSetClassModal] = useState(false);
  const [DAY, setDAY] = useState(0);
  const [classList, setClassList] = useState<any[]>([]);
  const [bookedDay, setBookedDay] = useState<number[]>([]);

  const toast = useToast();

  // 以下をrecoilで管理すればよい
  const [bookingChange] = useRecoilState(bookingChangeState);
  const [userInfo] = useRecoilState<UserInfo>(userInfoState);

  const [bookedClassInfoListObj, setBookedClassInfoListObj] = useState<BookedClassInfoListObj>();

  const collectionNameInMemo = useMemo(() => 'openDay_' + year + '_' + month, [year, month]);

  // 開校日を月ごとにfetchする関数
  const getOpenDayInfo = async () => {
    try {
      const response = await axios.get('/api/booking/fetchOpenDays', {
        params: { collectionName: collectionNameInMemo },
      });
      const itemList: SetStateAction<any[]> = [];
      response.data.forEach((data: any) => itemList.push(data._fieldsProto));
      setOpenDaysObjList(itemList);
    } catch (error) {
      console.log(error);
    }
  };

  // キャンセルするクラスを選択するモーダルを開く関数
  const handleOpenSetClassModal = (day: number) => {
    setDAY(day);
    setIsOpenSetClassModal((prev) => !prev);
  };

  const checkIsBefChangeExists = () => {
    return (
      bookingChange.yearBefChange &&
      bookingChange.monthBefChange &&
      bookingChange.dayBefChange &&
      bookingChange.classBefChange
    );
  };

  // 振替元の日付として設定されれているかどうかを判定する関数
  const checkIsSetAsBefChange = (day: number): boolean => {
    if (
      bookingChange.yearBefChange === year &&
      bookingChange.monthBefChange === month &&
      bookingChange.dayBefChange === day
    ) {
      return true;
    } else {
      return false;
    }
  };

  // 振替先の日付として設定されれているかどうかを判定する関数
  const checkIsSetAsAftChange = (day: number): boolean => {
    if (
      bookingChange.yearAftChange === year &&
      bookingChange.monthAftChange === month &&
      bookingChange.dayAftChange === day
    ) {
      return true;
    } else {
      return false;
    }
  };

  const unableOpenToast = () => {
    toast({
      title: '予約を変更するには、先に変更元の日時を選択してください。',
      status: 'error',
      position: 'bottom',
    });
  };

  // studentClassInfoを取得するAPI
  const getClassList = async (year: number, month: number, date: number) => {
    const dayOfWeek = getDayOfWeekEng(year, month, date);
    try {
      const response = await axios.get('api/fetchFireStore', {
        params: { collectionName: 'classes', docId: dayOfWeek },
      });
      const res = getClassListFormatted(response.data);
      setClassList(res);
    } catch (error) {
      console.log(error);
    }
  };

  // openDay_年_月のドキュメントすべてを取得するAPI
  const getAllDocs = async () => {
    try {
      const response = await axios.get('api/fetchCollection', {
        params: { collectionName: collectionNameInMemo },
      });

      const array = getDateByUID(response.data, userInfo.uid);

      setBookedDay(array);
    } catch (error) {
      console.log(error);
    }
  };

  // モーダルに渡す開校日の授業情報と、生徒の予約情報を取得するAPIを叩く
  useEffect(() => {
    getClassList(year, month, DAY);
    getBookedClassInfo(DAY);
  }, [DAY]);

  // ログインしている生徒の予約情報を取得するAPI
  const getBookedClassInfo = async (day: number) => {
    if (!collectionNameInMemo) {
      return; //何もしない
    }
    try {
      const response = await axios.get('api/booking/fetchBookedClassInfo', {
        params: { collectionName: collectionNameInMemo, docId: 'day_' + day, uid: userInfo.uid },
      });

      const resObj: any = response;
      const obj = packBookedClassInfo(resObj.data._fieldsProto);
      console.log('objaaa', obj);
      setBookedClassInfoListObj(obj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 設定している開校日情報をリセット
    setOpenDaysObjList([]);
    getOpenDayInfo();
    getAllDocs();
  }, [year, month]);

  // 変更後の情報が存在しているかを判定する関数
  const checkIsAftChangeExists = (): boolean => {
    return !!(
      bookingChange.yearAftChange &&
      bookingChange.monthAftChange &&
      bookingChange.dayAftChange &&
      bookingChange.classAftChange
    );
  };

  // days配列を作成する
  const days = [];
  for (let day = 0; day < startDay; day++) {
    days.push(
      <div key={`empty-${day}`} className="border-b border-r border-black bg-gray-300"></div>,
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = dayjs(new Date(year, month - 1, day));
    const isPast = currentDay.isBefore(today, 'day');

    // openDaysObjListの中にdayが含まれているかどうかを確認する
    const openDayList = openDaysObjList?.filter(
      (d: any) => Number(d?.date?.integerValue) === Number(day),
    );
    // dayが開校日に含まれていれば、trueになる
    const isOpenDay = openDayList.length > 0;

    days.push(
      <div
        key={day}
        className={`flex h-24 justify-center border-b border-r border-black py-4 text-center ${
          isPast ? 'bg-gray-200' : ''
        }`}
      >
        {!isPast && isOpenDay ? (
          // 開校日 && 基本曜日と一致している日のボタンはprime, 開校日 && 一致していない日はsecondary
          <>
            <ButtonOriginal
              variant={
                checkIsSetAsAftChange(day) || bookedDay.includes(day)
                  ? checkIsSetAsAftChange(day) || !checkIsSetAsBefChange(day)
                    ? 'primary'
                    : 'secondary'
                  : checkIsSetAsAftChange(day)
                  ? 'primary'
                  : 'secondary'
              }
              onClick={
                checkIsSetAsAftChange(day) || bookedDay.includes(day) || checkIsBefChangeExists()
                  ? () => handleOpenSetClassModal(day)
                  : () => unableOpenToast()
              }
              label={String(day)}
            />
          </>
        ) : (
          <>
            <div>{day}</div>
          </>
        )}
      </div>,
    );
  }

  // JSX
  return (
    <>
      <div className="grid grid-cols-7 border-l border-t border-black">{days}</div>
      {isOpenSetClassModal && (
        <div className="flex flex-col">
          <div className="fixed left-40 top-28 z-30 mx-auto mb-4">
            <ButtonOriginal
              variant="error-secondary"
              label="×"
              className="!flex !items-center !rounded-full !text-center text-4xl"
              onClick={() => setIsOpenSetClassModal((prev) => !prev)}
            />
          </div>

          <ClassSelectModalModal
            year={year}
            month={month}
            day={DAY}
            CLASS_LIST={classList}
            bookedClassInfoListObj={bookedClassInfoListObj}
            uid={userInfo.uid}
          />
        </div>
      )}
    </>
  );
};

export default Days;
