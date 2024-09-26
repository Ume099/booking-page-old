import BookingInfoBefChg from '@/components/calendar/BookingInfoBefChg';
import Calendar from '@/components/calendar/Calendar';
import ChangeYearAndMonthModal from '@/components/calendar/parts/ChangeYearAndMonthModal';
import Button from '@/components/common/parts/Button';
import ButtonOriginal from '@/components/common/parts/ButtonOriginal';

import { AuthGuard } from '@/feature/auth/component/AuthGuard/AuthGuard';
import { bookingChangeState } from '@/hooks/atom/bookingChange';
import { bookingChangeInfoState, BookingChangeInfoState } from '@/hooks/atom/bookingChangeInfo';
import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { getClassName } from '@/lib/SeatMap';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { useRecoilState } from 'recoil';

const MONTH_NAME: string[] = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];

type ChangeInfoState = {
  year: number;
  month: number;
  day: number;
};

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

export default function Booking() {
  const [isOpenSetmonthAndYearOnDisplayModal, setIsOpenSetmonthAndYearOnDisplayModal] =
    useState(false);
  const [yearOnDisplay, setYearOnDisplay] = useState<number>(currentYear);
  const [errorYear, setErrorYear] = useState('');
  const [errorMonth, setErrorMonth] = useState('');
  const [monthOnDisplay, setmonthOnDisplay] = useState(currentMonth + 1);

  const [bookingChange, setBookingChange] = useRecoilState(bookingChangeState);

  const [userInfo] = useRecoilState<UserInfo>(userInfoState);

  const [bookingChangeInfo, setBookingChangeInfo] =
    useRecoilState<BookingChangeInfoState>(bookingChangeInfoState);

  const [befChangeClass, setBefChangeClass] = useState<string[]>(['']);
  const [aftChangeClass, setAftChangeClass] = useState<string[]>(['']);

  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);

  // 編集する月を設定する関数
  const setMonth = (num: number) => {
    setmonthOnDisplay(num);
    if (yearOnDisplay === currentYear && num - 1 < currentMonth) {
      setErrorMonth('過去の情報は取得できません。');
      setIsOpenSetmonthAndYearOnDisplayModal(false);
      return; //何もしない
    } else if (yearOnDisplay < currentYear) {
      setErrorMonth('過去の情報は取得できません。');
      setIsOpenSetmonthAndYearOnDisplayModal(false);
      return; //何もしない
    }
    setErrorMonth('');
    setIsOpenSetmonthAndYearOnDisplayModal(false);
  };

  const handleOpenSetmonthAndYearOnDisplayModal = (): void => {
    setIsOpenSetmonthAndYearOnDisplayModal(!isOpenSetmonthAndYearOnDisplayModal);
  };

  // 月and年変更モーダルで年を増加させる関数
  const setYearIncremented = () => {
    if (yearOnDisplay + 1 >= currentYear) {
      setErrorYear('');
    }
    setYearOnDisplay((prev) => prev + 1);
  };

  // 月and年変更モーダルで年を減少させる関数
  const setYearDecremented = () => {
    if (yearOnDisplay === currentYear) {
      setErrorYear('過去の情報は取得できません。');
    } else if (yearOnDisplay === currentYear || monthOnDisplay === currentMonth) {
      setErrorMonth('過去の情報は取得できません。');
    }
    setYearOnDisplay((prev) => prev - 1);
  };

  // 変更元の授業が設定されているかを確認する関数
  const checkIsClassBefChangeExists = () => {
    return (
      bookingChange.yearBefChange &&
      bookingChange.monthBefChange &&
      bookingChange.dayBefChange &&
      bookingChange.classBefChange
    );
  };
  // 変更先の授業が設定されているかを確認する関数
  const checkIsClassAftChangeExists = () => {
    return (
      bookingChange.yearAftChange &&
      bookingChange.monthAftChange &&
      bookingChange.dayAftChange &&
      bookingChange.classAftChange
    );
  };

  const clearClassBefChange = async (isFromResetButton: boolean = true) => {
    if (isFromResetButton) {
      const isConfirm = await confirm('保存していない振替をリセットしますか？');

      if (!isConfirm) {
        return; //何もしない
      }
    }
    // リセット用のオブジェクト
    const classInfoDefault = {
      yearBefChange: 0,
      monthBefChange: 0,
      dayBefChange: 0,
      classBefChange: '',
      yearAftChange: 0,
      monthAftChange: 0,
      dayAftChange: 0,
      classAftChange: '',
    };
    setBookingChange(classInfoDefault);
    // classChangeStatus をdefaultにする
    setBookingChangeInfo({
      classChangeInfo: [{ classBefChange: '', classAftChange: '' }],
    });
  };

  // 特定の日の予約状況を取得してaftChangeに設定する関数
  const getBookedClassInfo = async (
    year: number,
    month: number,
    day: number,
    className: string,
    isForAft: boolean,
  ) => {
    try {
      const response = await axios.get('api/booking/fetchClassStatus', {
        params: {
          collectionName: `openDay_${year}_${month}`,
          docId: 'day_' + day,
          uid: userInfo.uid,
          fieldName: className,
        },
      });

      const obj: string[] = response.data.fieldValue;
      if (isForAft) {
        setAftChangeClass(obj);
      } else {
        setBefChangeClass(obj);
      }
      console.log('obj', response.data.fieldValue);
    } catch (error) {
      console.log(error);
    }
  };

  const toast = useToast();

  function isPast10PMOfPreviousDay(year: number, month: number, day: number) {
    // Get the current date and time
    const now = new Date();

    // Create a Date object for 10 PM on the previous day
    const previousDay10PM = new Date(year, month - 1, day - 1, 21, 0, 0);

    // Compare the current time with 10 PM of the previous day
    return now > previousDay10PM;
  }

  // 変更情報を更新するAPI
  const handleSaveChange = async () => {
    if (
      isPast10PMOfPreviousDay(
        bookingChange.yearAftChange,
        bookingChange.monthAftChange,
        bookingChange.dayAftChange,
      ) ||
      isPast10PMOfPreviousDay(
        bookingChange.yearBefChange,
        bookingChange.monthBefChange,
        bookingChange.dayBefChange,
      )
    ) {
      toast({
        title: '前日の午後10時を過ぎているため、予定を変更できません。',
        status: 'error',
        position: 'top',
      });
      return;
    }
    if (!checkIsClassBefChangeExists() || !checkIsAftChangeInfoExists()) {
      toast({
        title: !checkIsClassAftChangeExists()
          ? !checkIsClassBefChangeExists()
            ? '振替元の曜日を選択して下さい。'
            : '振替先の曜日を選択してください。'
          : '',
        status: 'error',
        position: 'top',
      });
      return;
    }
    let isError: boolean = false;
    getBookedClassInfo(
      bookingChange.yearAftChange,
      bookingChange.monthAftChange,
      bookingChange.dayAftChange,
      getClassName(bookingChange.classAftChange),
      true,
    );

    setIsSaveButtonLoading(true);
    // AtfChangeを追加
    try {
      const response = await fetch('/api/booking/updateClassChangeInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName: `openDay_${bookingChange.yearAftChange}_${bookingChange.monthAftChange}`,
          docId: `day_${bookingChange.dayAftChange}`,
          fieldName: getClassName(bookingChange.classAftChange),
          newVal: [...aftChangeClass, userInfo.uid],
        }),
      });
    } catch (e) {
      isError = true;
      console.log(e);
    }

    if (isError) {
      return; //何もしない
    }

    getBookedClassInfo(
      bookingChange.yearBefChange,
      bookingChange.monthBefChange,
      bookingChange.dayBefChange,
      getClassName(bookingChange.classBefChange),
      false,
    );

    try {
      const response = await fetch('/api/booking/updateClassChangeInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName: `openDay_${bookingChange.yearBefChange}_${bookingChange.monthBefChange}`,
          docId: `day_${bookingChange.dayBefChange}`,
          fieldName: getClassName(bookingChange.classBefChange),
          newVal: befChangeClass.filter((classInfo) => classInfo !== userInfo.uid),
        }),
      });
    } catch (e) {
      isError = true;
      console.log(e);
    } finally {
      setIsSaveButtonLoading(false);
      clearClassBefChange(false);
    }

    isError = true;
    location.reload();
  };

  const checkIsAftChangeInfoExists = (): boolean => {
    if (!bookingChange.yearAftChange) {
      return false;
    }

    if (!bookingChange.monthAftChange) {
      return false;
    }
    if (!bookingChange.dayAftChange) {
      return false;
    }
    if (!bookingChange.classAftChange) {
      return false;
    }
    return true;
  };

  // recoil管理のbookingChangeInfoListに、新規追加する変更情報Objを設定する関数
  const handleSetBookingChangeInfo = () => {
    if (!checkIsAftChangeInfoExists()) {
      console.log('checkIsAftChangeInfoExists()', checkIsAftChangeInfoExists());
      return; // 何もしない
    }
    // 振替元の情報
    const classBefChange =
      bookingChange.yearBefChange +
      '_' +
      bookingChange.monthBefChange +
      '_' +
      bookingChange.dayBefChange +
      '-' +
      bookingChange.classBefChange;

    // 振替先の情報
    const classAftChange =
      bookingChange.yearAftChange +
      '_' +
      bookingChange.monthAftChange +
      '_' +
      bookingChange.dayAftChange +
      '-' +
      bookingChange.classAftChange;

    const additionalClassChangeInfoObj = {
      classBefChange,
      classAftChange,
    };

    const newClassChangeInfoObj = {
      classChangeInfo: [...(bookingChangeInfo.classChangeInfo || []), additionalClassChangeInfoObj],
    };

    setBookingChangeInfo(newClassChangeInfoObj);
  };

  useEffect(() => {
    return () => {
      handleSetBookingChangeInfo();
    };
    // classAfterChangeが設定されれば、クラス変更情報のオブジェクトがセットされる
  }, [checkIsAftChangeInfoExists()]);

  return (
    // 未サインインの場合はサインインページにジャンプ
    <AuthGuard>
      <div>
        <div className="">
          {!isOpenSetmonthAndYearOnDisplayModal ? (
            <div className="flex gap-4">
              <div className="mt7u-[52px] pl-12">
                <Button
                  onClick={handleOpenSetmonthAndYearOnDisplayModal}
                  variant="primary"
                  label={String(monthOnDisplay)}
                  className="h-16 w-16"
                  Icon={GoTriangleDown}
                />
              </div>
              <BookingInfoBefChg
                label={
                  checkIsClassBefChangeExists()
                    ? `変更前: ${bookingChange.yearBefChange}年 ${bookingChange.monthBefChange}月 ${bookingChange.dayBefChange}日 ${bookingChange.classBefChange}`
                    : ''
                }
              />
              <p className="flex items-center"> ⇒</p>
              <BookingInfoBefChg
                label={
                  checkIsClassAftChangeExists()
                    ? `変更後: ${bookingChange.yearAftChange}年 ${bookingChange.monthAftChange}月 ${bookingChange.dayAftChange}日 ${bookingChange.classAftChange}`
                    : ''
                }
              />
              <div className="grid grid-cols-1 gap-y-4">
                <ButtonOriginal
                  onClick={() => handleSaveChange()}
                  label="保存"
                  variant="primary"
                  disabled={isSaveButtonLoading}
                />
                <ButtonOriginal
                  onClick={() => clearClassBefChange()}
                  label="リセット"
                  variant="error-secondary"
                />
              </div>
            </div>
          ) : (
            // 月and年変更モーダル
            <ChangeYearAndMonthModal
              setIsOpenSetmonthAndYearOnDisplayModal={handleOpenSetmonthAndYearOnDisplayModal}
              setYearDecremented={setYearDecremented}
              yearOnDisplay={yearOnDisplay}
              setYearIncremented={setYearIncremented}
              setMonth={setMonth}
              errorYear={errorYear}
            />
          )}
        </div>

        {/* カレンダー本体 */}
        <div className="">
          <div className="mt-2 flex justify-center text-red-500">{errorMonth}</div>
          <Calendar year={yearOnDisplay} month={monthOnDisplay} />
        </div>
      </div>
    </AuthGuard>
  );
}
