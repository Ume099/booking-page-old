import CalenderToSetOpen from '@/components/calendar/CalenderToSetOpen';
import Button from '@/components/common/parts/Button';
import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import CalendarButton from '@/components/common/parts/CalendarButton';

import { AuthGuard } from '@/feature/auth/component/AuthGuard/AuthGuard';
import { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';

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

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

export default function setOpenDays() {
  const [isOpenSetmonthAndYearOnDisplayModal, setIsOpenSetmonthAndYearOnDisplayModal] =
    useState(false);
  const [yearOnDisplay, setYearOnDisplay] = useState<number>(currentYear);
  const [errorYear, setErrorYear] = useState('');
  const [errorMonth, setErrorMonth] = useState('');
  const [monthOnDisplay, setmonthOnDisplay] = useState(currentMonth + 1);

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

  return (
    // 未サインインの場合はサインインページにジャンプ
    <AuthGuard>
      <div>
        <div className="">
          {!isOpenSetmonthAndYearOnDisplayModal ? (
            <div className="flex gap-4">
              <div className="mt7u-[52px] pl-12">
                <Button
                  variant="primary"
                  label={String(monthOnDisplay)}
                  onClick={() =>
                    setIsOpenSetmonthAndYearOnDisplayModal(!isOpenSetmonthAndYearOnDisplayModal)
                  }
                  className="h-16 w-16"
                  Icon={GoTriangleDown}
                />
              </div>
            </div>
          ) : (
            // 月and年変更モーダル
            <div className="px-auto max-w-sm lg:max-w-4xl">
              <div className="mt-[148px]"></div>
              <div className="fixed top-[60px] z-10 h-screen w-screen bg-gray-700 opacity-90">
                <div className="mt-12 px-6">
                  <div className="flex gap-x-10">
                    <CalendarButton
                      variant="secondary"
                      onClick={() =>
                        setIsOpenSetmonthAndYearOnDisplayModal(!isOpenSetmonthAndYearOnDisplayModal)
                      }
                      Icon={IoMdClose}
                      className="flex h-16 w-16 items-center justify-center text-center"
                    />
                    <div className="flex w-1/2 justify-center">
                      <div className="z-10 rounded-lg bg-white py-4 text-center">
                        <div className="flex items-center justify-center  gap-x-10">
                          <ButtonOriginal
                            onClick={() => setYearDecremented()}
                            label="◀"
                            className="border-none text-4xl"
                          />
                          <div className="text-4xl">{yearOnDisplay}</div>
                          <ButtonOriginal
                            onClick={() => setYearIncremented()}
                            label="▶"
                            className="border-none text-4xl"
                          />
                        </div>
                        <div className="mt-2 min-h-8 text-red-600">{errorYear}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 grid grid-cols-3">
                    {MONTH_NAME.map((m, index) => (
                      <div className="">
                        <ul className="">
                          <li>
                            <CalendarButton
                              key={index}
                              label={m}
                              variant="secondary"
                              onClick={() => setMonth(index + 1)}
                              className="w-24"
                            />
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* カレンダー本体 */}
        <div className="">
          <div className="mt-2 flex justify-center text-red-500">{errorMonth}</div>
          <CalenderToSetOpen year={yearOnDisplay} month={monthOnDisplay} />
        </div>
      </div>
    </AuthGuard>
  );
}
