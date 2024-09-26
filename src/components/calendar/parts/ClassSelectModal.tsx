import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import { bookingChangeState } from '@/hooks/atom/bookingChange';
import { useRecoilState } from 'recoil';

import { BookedClassInfoListObj } from '@/lib/userSettings';

const classNameList = ['class1', 'class2', 'class3', 'class4', 'class5', 'class6', 'class7'];

type Props = {
  year: number;
  month: number;
  day: number;
  CLASS_LIST: string[];
  bookedClassInfoListObj: BookedClassInfoListObj | undefined;
  uid: string;
};

// 関数コンポーネント
const ClassSelectModalModal = (props: Props) => {
  const { year, month, day, CLASS_LIST, bookedClassInfoListObj, uid } = props;
  const [bookingChange, setBookingChange] = useRecoilState(bookingChangeState);

  const buttons = [];

  const checkBookedClass = () => {
    if (!bookedClassInfoListObj) {
      return; //return //何もしない
    }
    const obj = {
      class1: bookedClassInfoListObj.class1?.includes(uid) || false,
      class2: bookedClassInfoListObj.class2?.includes(uid) || false,
      class3: bookedClassInfoListObj.class3.includes(uid),
      class4: bookedClassInfoListObj.class4.includes(uid),
      class5: bookedClassInfoListObj.class5.includes(uid),
      class6: bookedClassInfoListObj.class6.includes(uid),
      class7: bookedClassInfoListObj.class7.includes(uid),
    };
    return obj;
  };

  // 振替元の授業情報を設定する関数
  const setClassBefChange = (year: number, month: number, day: number, clName: string) => {
    const classBefChange = {
      ...bookingChange,
      yearBefChange: year,
      monthBefChange: month,
      dayBefChange: day,
      classBefChange: clName,
    };
    setBookingChange(classBefChange);
  };

  // 振替元の授業情報を設定する関数
  const clearClassBefChange = () => {
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
  };

  // 振替元の授業情報を設定する関数
  const clearClassAftChange = () => {
    const classAftChange = {
      ...bookingChange,
      yearAftChange: 0,
      monthAftChange: 0,
      dayAftChange: 0,
      classAftChange: '',
    };
    setBookingChange(classAftChange);
  };

  // 振替先の授業情報を設定する関数
  const setClassAftChange = (year: number, month: number, day: number, clName: string) => {
    //変更元が設定されていなければ、returnする
    if (
      !bookingChange.yearBefChange &&
      !bookingChange.monthBefChange &&
      !bookingChange.dayBefChange &&
      !bookingChange.classBefChange
    ) {
      alert('最初に振替元の日程を設定してください。');
      return; //何もしない
    }

    const classAftChange = {
      ...bookingChange,
      yearAftChange: year,
      monthAftChange: month,
      dayAftChange: day,
      classAftChange: clName,
    };
    setBookingChange(classAftChange);
  };

  const BookedClass = checkBookedClass();
  let i = 0;
  // buttonにpushして、リストを作成する
  for (let clName of CLASS_LIST) {
    if (!BookedClass) {
      continue;
    }
    // 土曜日ならi を2こずらす
    let className = classNameList[i + 2];
    console.log(CLASS_LIST.length);
    // clNameをclass1, class2などに復元する
    if (CLASS_LIST.length === 5) {
      classNameList[i + 2];
    } else {
      className = classNameList[i];
    }

    let isBooked;

    switch (className) {
      case 'class1':
        isBooked = BookedClass.class1;
        break;
      case 'class2':
        isBooked = BookedClass.class2;
        break;

      case 'class3':
        isBooked = BookedClass.class3;
        break;

      case 'class4':
        isBooked = BookedClass.class4;
        break;

      case 'class5':
        isBooked = BookedClass.class5;
        break;

      case 'class6':
        isBooked = BookedClass.class6;
        break;

      case 'class7':
        isBooked = BookedClass.class7;
        break;
    }

    // 振替元として設定しているかどうかを確認する関数
    const checkIsSetAsClassBefChange = () => {
      return (
        bookingChange.yearBefChange === year &&
        bookingChange.monthBefChange === month &&
        bookingChange.dayBefChange === day &&
        bookingChange.classBefChange === clName
      );
    };

    // 振替先として設定しているかどうかを確認する関数
    const checkIsSetAsClassAftChange = () => {
      return (
        bookingChange.yearAftChange === year &&
        bookingChange.monthAftChange === month &&
        bookingChange.dayAftChange === day &&
        bookingChange.classAftChange === clName
      );
    };

    // ボタンを、授業が振替元・振替先と一致しているかどうかの状況に応じて変えて追加していく。
    if (isBooked && !checkIsSetAsClassBefChange()) {
      // 既存の予約としてセットされている場合
      buttons.push(
        <li key={clName}>
          <ButtonOriginal
            onClick={() => setClassBefChange(year, month, day, clName)}
            className="w-full"
            label={clName}
            variant="primary"
          />
        </li>,
      );
    } else if (checkIsSetAsClassBefChange()) {
      // 振替元の授業としてセットされている場合
      buttons.push(
        <li key={clName}>
          <ButtonOriginal
            // 振替元の情報をクリア
            onClick={() => clearClassBefChange()}
            className="w-full"
            label={clName}
            variant="error-secondary"
          />
        </li>,
      );
    } else if (checkIsSetAsClassAftChange()) {
      // 振替先の授業としてセットされている場合
      buttons.push(
        <li key={clName}>
          <ButtonOriginal
            onClick={() => clearClassAftChange()}
            className="w-full"
            label={clName}
            variant="primary"
          />
        </li>,
      );
    } else {
      // 予約が入っていない（振替先として選択可能な授業）
      buttons.push(
        <li key={clName}>
          <ButtonOriginal
            onClick={() => setClassAftChange(year, month, day, clName)}
            className="w-full"
            label={clName}
            variant="secondary"
          />
        </li>,
      );
    }

    i++;
  }

  // 振替元の授業が設定されているかをチェックする関数
  const checkIsSetClassBefChange = () => {
    return (
      bookingChange.yearBefChange &&
      bookingChange.monthBefChange &&
      bookingChange.dayBefChange &&
      bookingChange.classBefChange
    );
  };

  return (
    <>
      {/* 透過背景のみ */}
      <div className="fixed left-0 top-14 z-10 flex h-screen w-screen items-center justify-center bg-gray-600 opacity-90"></div>

      {/* ボタンなど */}
      <div className="fixed left-0 top-14 z-10 flex h-screen w-screen items-center justify-center">
        <div className="w-full">
          <div className="mx-auto mb-4 flex justify-center">
            <div className="mx-auto flex w-1/2 items-center justify-center rounded-lg border-2 border-primary bg-white p-6 font-bold !opacity-100">
              <p className="text-center text-lg lg:text-xl">
                {checkIsSetClassBefChange()
                  ? '振り替え先の授業を選択してください。'
                  : '変更する授業を選択してください。'}
              </p>
            </div>
          </div>
          <div className="mx-auto flex w-1/2 items-center justify-center rounded-lg border-2 border-primary bg-white p-10 !opacity-100">
            <div className="w-full">
              <p className="mb-4 inline-block w-full text-center">
                {year}年{month}月{day}日の予定 <br />
                （青色が予約済）
              </p>
              <ul className="mx-auto grid w-2/3 gap-y-6">{buttons}</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassSelectModalModal;
