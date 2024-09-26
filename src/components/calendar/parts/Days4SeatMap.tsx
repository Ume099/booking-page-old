import axios from 'axios';
import dayjs from 'dayjs';
import { SetStateAction, useEffect, useMemo, useState } from 'react';

import SeatMapModal from '@/components/calendar/parts/SeatMapModal';
import ButtonOriginal from '@/components/common/parts/ButtonOriginal';

import { DAY_STARTS_WITH_SUN } from '@/lib/date';
import DayOfWeek from './DayOfWeek';

type Props = {
  year: number;
  month: number;
};

// 曜日を取得する関数
const getDayOfWeek = (year: number, month: number, day: number) => {
  const date = new Date(year, month - 1, day); // 月は0から始まるので、1月は0, 2月は1, というように設定
  const daysOfWeek = DAY_STARTS_WITH_SUN;
  return daysOfWeek[date.getDay()];
};

const Days4SeatMap = (props: Props) => {
  const { year, month } = props;
  const today = dayjs();
  const [isOpenSetClassModal, setIsOpenSetClassModal] = useState(false);
  const [openDayList, setOpenDayList] = useState([]);
  const [day, setDay] = useState(0);

  const collectionNameInMemo = useMemo(() => 'openDay_' + year + '_' + month, [year, month]);

  // 開校日を月ごとにfetchする関数
  const getOpenDayInfo = async (collectionName: string) => {
    console.log('getOpenDayInfo', collectionName);
    try {
      const response = await axios.get('/api/booking/fetchOpenDays', {
        params: { collectionName },
      });
      const itemList: SetStateAction<any[]> = [];
      response.data.forEach((data: any) => itemList.push(data._fieldsProto));

      // openDayListに開校日を格納
      const opnDayList = itemList.map((openDaysObj) => parseInt(openDaysObj.date?.integerValue));

      // openDayList[0]はundefined
      opnDayList.shift();
      setOpenDayList(opnDayList);
    } catch (error) {
      console.log(error);
    }
  };

  // month, yearが変更されてから、レンダリング前に開校日配列を取得する関数を実行する
  useEffect(() => {
    getOpenDayInfo(collectionNameInMemo);
  }, [collectionNameInMemo]);

  // 日付ボタンをクリックした際にdayをセットする関数
  const handleSetDay = (day: number) => {
    setDay(day);
  };

  const handleOpenSetClassModal = (day) => {
    handleSetDay(day);
    setIsOpenSetClassModal((prev) => !prev);
  };
  // dayがopenDayListに含まれているかを判定する関数
  const checkIsOpenDay = (targetDay: number) => {
    if (!targetDay) {
      return;
    }
    return openDayList.includes(targetDay);
  };

  const firstDayOfMonth = dayjs(new Date(year, month - 1, 1));
  const startDay = firstDayOfMonth.day();
  const daysInMonth = firstDayOfMonth.daysInMonth();

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

    // 過ぎた日、not開校日、開校日
    if (isPast) {
      days.push(
        <div
          key={day}
          className="flex h-24 justify-center border-b border-r border-black bg-gray-200 py-4 text-center"
        >
          <div>{day}</div>
        </div>,
      );
    } else if (checkIsOpenDay(day)) {
      // 開校日 && 基本曜日と一致している日のボタンはprime, 開校日 && 一致していない日はsecondary
      days.push(
        <div
          key={day}
          className="flex h-24 justify-center border-b border-r border-black py-4 text-center"
        >
          <ButtonOriginal
            variant="secondary"
            label={String(day)}
            onClick={() => handleOpenSetClassModal(day)}
          />
        </div>,
      );
    } else {
      // 開校日 && 基本曜日と一致している日のボタンはprime, 開校日 && 一致していない日はsecondary
      days.push(
        <div
          key={day}
          className="flex h-24 justify-center border-b border-r border-black py-4 text-center"
        >
          {day}
        </div>,
      );
    }
  }

  // JSX
  return (
    <>
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

          <SeatMapModal year={year} month={month} day={day} />
        </div>
      )}
      <DayOfWeek />

      <div className="grid grid-cols-7 border-l border-t border-black">{days}</div>
    </>
  );
};

export default Days4SeatMap;
