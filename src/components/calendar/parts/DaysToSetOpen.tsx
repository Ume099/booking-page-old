// components/Days.tsx

import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoReloadCircleOutline } from 'react-icons/io5';

import {
  DAY_ENGLISH,
  getDayOfWeekEng,
  getFormattedStandardClassMap,
  GetFormattedStandardClassMapReturn,
} from '@/lib/date';
import axios from 'axios';

type DaysProps = {
  year: number;
  month: number;
  setOpenDay: (day: number) => void;
};
const today = dayjs();

const DaysToSetOpen = ({ year, month, setOpenDay }: DaysProps) => {
  const [openDaysObjList, setOpenDaysObjList] = useState([]);
  const firstDayOfMonth = dayjs(new Date(year, month - 1, 1));
  const startDay = firstDayOfMonth.day();
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const [standardSeatMapSat, setStandardSeatMapSat] =
    useState<GetFormattedStandardClassMapReturn>();

  // 座席表を取得する
  const fetchSeatMap = async (day: string) => {
    console.log(day);
    try {
      const response = await axios.get('/api/fetchFireStore', {
        params: { collectionName: 'standardSeatMap', docId: day.toLowerCase() },
      });

      console.log(getFormattedStandardClassMap(response.data));
      setStandardSeatMapSat(getFormattedStandardClassMap(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  // 開校日を追加する関数
  const addOpenDays = async (collectionName: string, dataObj: any) => {
    try {
      const response = await fetch('/api/booking/addOpenDays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionName, ...dataObj, ...standardSeatMapSat }),
      });
      if (response.ok) {
        console.log('Document added successfully');
      } else {
        console.log('Failed to add document');
      }
    } catch (error) {
      console.error('Error adding open day:', error);
    } finally {
      getOpenDayInfo();
    }
  };

  const handleAddOpenDate = async (day: number) => {
    // ここにstandardSeatMapを取得する関数を追加
    await fetchSeatMap(getDayOfWeekEng(year, month, day));
    //if (!confirm('開校日を追加しますか?')) return;
    // return;

    const collectionName = 'openDay_' + year + '_' + month;
    const date = new Date(year, month - 1, day);
    const dayOfWeek = DAY_ENGLISH[date.getDay()];

    const dataObj: any = { date: day, dayOfWeek };

    await addOpenDays(collectionName, dataObj);
  };
  const handleDeleteOpenDate = async (day: number) => {
    // confirm('開校日を削除しますか?');
    const collectionName: String = 'openDay_' + year + '_' + month;

    try {
      const response = await fetch('/api/booking/deleteOpenDays', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName: collectionName,
          fieldName: 'date',
          fieldValue: day,
        }),
      });
    } catch (e) {
      console.log(e);
    } finally {
      getOpenDayInfo();
    }
  };

  // 開校日を月ごとにfetchする関数
  const getOpenDayInfo = async () => {
    // openDay_2024_7のような文字列を格納
    const collectionName: String = 'openDay_' + year + '_' + month;
    try {
      const response = await axios.get('/api/booking/fetchOpenDays', {
        params: { collectionName },
      });
      const itemList: any = [];
      response.data.forEach((data: any) => {
        itemList.push(data._fieldsProto);
      });

      setOpenDaysObjList(itemList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 設定している開校日情報をリセット
    setOpenDaysObjList([]);
    getOpenDayInfo();
    // 年と月が設定されたら再度fetch
  }, [year, month]);

  const days = [];
  for (let day = 0; day < startDay; day++) {
    days.push(
      <div key={`empty-${day}`} className="border-b border-r border-black bg-gray-300 py-12"></div>,
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = dayjs(new Date(year, month - 1, day));
    const isPast = currentDay.isBefore(today, 'day');

    // openDaysListの中にiが含まれているかどうかを確認する
    const isOpenDayList = openDaysObjList?.filter(
      (d: any) => Number(d?.date?.integerValue) === Number(day),
    );

    // dayが開校日に含まれていれば、trueになる
    const isOpenDay = isOpenDayList.length > 0;
    days.push(
      <div
        key={day}
        className={`flex h-24 justify-center border-b border-r border-black py-4 text-center ${
          isPast ? 'bg-gray-200' : ''
        }`}
      >
        {isOpenDay ? (
          <ButtonOriginal
            variant="error"
            onClick={() => handleDeleteOpenDate(day)}
            label={String(day)}
            className=""
          />
        ) : (
          <ButtonOriginal
            variant="secondary"
            onClick={() => handleAddOpenDate(day)}
            label={String(day)}
            className=""
          />
        )}
      </div>,
    );
  }

  return (
    <div className="grid grid-cols-7 border-l border-t border-black">
      {days}
      <ButtonOriginal
        variant="primary"
        Icon={IoReloadCircleOutline}
        label="日時取得"
        onClick={() => getOpenDayInfo()}
      />
    </div>
  );
};

export default DaysToSetOpen;
