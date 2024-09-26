type ValueType = 'stringValue' | 'arrayValue';

interface StringValue {
  stringValue: string;
  valueType: 'stringValue';
}

interface ArrayValue {
  arrayValue: {
    values: StringValue[];
  };
  valueType: 'arrayValue';
}

interface Obj {
  class1: ArrayValue;
  class2: ArrayValue;
  class3: ArrayValue;
  class4: ArrayValue;
  class5: ArrayValue;
  class6: ArrayValue;
  class7: ArrayValue;
}

// 各クラスごとの状態を保持するインターフェース
export interface BookingStatus {
  class1: string[];
  class2: string[];
  class3: string[];
  class4: string[];
  class5: string[];
  class6: string[];
  class7: string[];
}

// SeatMap クラス
export class SeatMap implements BookingStatus {
  class1: string[];
  class2: string[];
  class3: string[];
  class4: string[];
  class5: string[];
  class6: string[];
  class7: string[];

  constructor(obj: Obj) {
    this.class1 = obj.class1?.arrayValue.values.map((value) => value.stringValue);
    this.class2 = obj.class2?.arrayValue.values.map((value) => value.stringValue);
    this.class3 = obj.class3?.arrayValue.values.map((value) => value.stringValue);
    this.class4 = obj.class4?.arrayValue.values.map((value) => value.stringValue);
    this.class5 = obj.class5?.arrayValue.values.map((value) => value.stringValue);
    this.class6 = obj.class6?.arrayValue.values.map((value) => value.stringValue);
    this.class7 = obj.class7?.arrayValue.values.map((value) => value.stringValue);
  }
}

type classObj = { classIndex: string; classTitle: string; startAt: string };

export const CLASS_LIST: classObj[] = [
  { classIndex: 'class1', classTitle: '1講目', startAt: '10:00' },
  { classIndex: 'class2', classTitle: '2講目', startAt: '11:00' },
  { classIndex: 'class3', classTitle: '3講目', startAt: '13:00' },
  { classIndex: 'class4', classTitle: '4講目', startAt: '14:00' },
  { classIndex: 'class5', classTitle: '5講目', startAt: '15:00' },
  { classIndex: 'class6', classTitle: '6講目', startAt: '16:00' },
  { classIndex: 'class7', classTitle: '7講目', startAt: '17:00' },
];

export const CLASS_SELECT_LIST = CLASS_LIST.map(({ classIndex, classTitle }) => ({
  value: classIndex,
  label: classTitle,
}));

type DaySchedule = {
  id: string;
  date: number;
  class1: string[];
  class2: string[];
  class3: string[];
  class4: string[];
  class5: string[];
  class6: string[];
  class7: string[];
  dayOfWeek: string;
};

// 関数：UIDを含むオブジェクトのdateを取得
export const getDateByUID = (data: DaySchedule[], uid: string) => {
  // UIDを含むdateを取得するために、filterで条件に合うオブジェクトのdateを抽出
  return data
    .filter((item) =>
      Object.values(item).some(
        (value) => Array.isArray(value) && value.includes(uid), // valueが配列であり、UIDを含んでいるかを確認
      ),
    )
    .map((item) => item.date); // 条件に合うdateを返す
};

export const getClassName = (classTime: string): string => {
  switch (classTime) {
    case '10:00~10:50':
      return 'class1';

    case '11:00~11:50':
      return 'class2';

    case '13:00~13:50':
      return 'class3';

    case '14:00~14:50':
      return 'class4';

    case '15:00~15:50':
      return 'class5';

    case '16:00~16:50':
      return 'class6';

    case '17:00~17:50':
      return 'class7';
    default:
      return 'default';
  }
};
