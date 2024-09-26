import Calendar4SeatMap from '@/components/calendar/Calendar4SeatMap';
import ChangeYMModal from '@/components/calendar/parts/ChangeYMModal';
import ButtonOriginal from '@/components/common/parts/ButtonOriginal';

import { AuthGuard } from '@/feature/auth/component/AuthGuard/AuthGuard';
import { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';

type ChangeInfoState = {
  year: number;
  month: number;
  day: number;
};

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

// 現在の月、年を取得する関数
function getCurrentYM(): { year: number; month: number; day: number } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return { year, month, day };
}

const isBeforeCurrentMonthYear = (year: number, month: number): boolean => {
  const now = new Date();

  const currentYear = now.getFullYear(); // 現在の年を取得
  const currentMonth = now.getMonth() + 1; // 現在の月を取得（0が1月なので+1）

  if (year < currentYear) {
    return true; // yearが現在の年より前ならtrue
  }

  if (year === currentYear && month < currentMonth) {
    return true; // yearが同じで、monthが現在の月より前ならtrue
  }

  return false; // それ以外はfalse
};

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [year, setYear] = useState<number>(getCurrentYM().year);
  const [month, setMonth] = useState(getCurrentYM().month);
  const [errorYear, setErrorYear] = useState('');

  // 月日変更モーダルを開閉するモーダル
  const handleOpenModal = () => {
    setIsOpenModal((prevState) => !prevState);
  };

  // 月をセットする関数
  const handleSetMonth = (month: number) => {
    if (isBeforeCurrentMonthYear(year, month)) {
      alert('過去のデータは取得できません。');
      return;
    }
    setMonth(month);
    handleOpenModal();
  };

  // 年を1減らす関数
  const handleDecrementYear = () => {
    if (getCurrentYM().year === year) {
      setErrorYear('過去のデータは取得できません。');
      setYear(getCurrentYM().year - 1);
      return;
    } else if (getCurrentYM().year > year) {
      return;
    }

    setErrorYear('');
    setYear((prevState: number) => prevState - 1);
  };

  // 年を1増やす関数
  const handleIncrementYear = () => {
    if (!isBeforeCurrentMonthYear(year + 1, month)) {
      setErrorYear('');
    }
    setYear((prevState: number) => prevState + 1);
  };

  return (
    // 未サインインの場合はサインインページにジャンプ
    <AuthGuard>
      <div>
        <div className="">
          {!isOpenModal ? (
            <div className="flex gap-4">
              <div className="mt-[52px] pl-12">
                <ButtonOriginal
                  onClick={() => handleOpenModal()}
                  variant="primary"
                  label={String(month) + '月'}
                  className="h-16 w-16"
                  Icon={GoTriangleDown}
                />
              </div>
            </div>
          ) : (
            // 月and年変更モーダル
            <ChangeYMModal
              month={month}
              year={year}
              handleSetMonth={handleSetMonth}
              handleDecrementYear={handleDecrementYear}
              handleIncrementYear={handleIncrementYear}
              handleCloseModal={handleOpenModal}
              errorYear={errorYear}
            />
          )}
        </div>

        {/* カレンダー本体 */}
        <div className="">
          <Calendar4SeatMap year={year} month={month} />
        </div>
      </div>
    </AuthGuard>
  );
}
