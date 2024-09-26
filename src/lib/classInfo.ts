// 授業の種類
export type CLASS_TIME_TYPE =
  | '10:00~10:50'
  | '11:00~11:50'
  | '13:00~13:50'
  | '14:00~14:50'
  | '15:00~15:50'
  | '16:00~16:50'
  | '17:00~17:50';

export const CLASS_TIME = [
  '10:00~10:50',
  '11:00~11:50',
  '13:00~13:50',
  '14:00~14:50',
  '15:00~15:50',
  '16:00~16:50',
  '17:00~17:50',
];

export const CLASS_NAME = ['class1', 'class2', 'class3', 'class4', 'class5', 'class6', 'class7'];

type StringValue = {
  stringValue: string;
  valueType: 'stringValue';
};

type ArrayValue = {
  arrayValue: {
    values: StringValue[];
  };
  valueType: 'arrayValue';
};

type BookingStatusObj = {
  class1: ArrayValue;
  class2: ArrayValue;
  class3: ArrayValue;
  class4: ArrayValue;
  class5: ArrayValue;
  class6: ArrayValue;
  class7: ArrayValue;
};

export type BookingStatusObjReturn = {
  class1: string[];
  class2: string[];
  class3: string[];
  class4: string[];
  class5: string[];
  class6: string[];
  class7: string[];
};

export const getBookingStatusObj = (obj: BookingStatusObj): BookingStatusObjReturn => {
  const formattedObj = {
    class1: obj.class1.arrayValue.values.map((value) => value.stringValue),
    class2: obj.class2.arrayValue.values.map((value) => value.stringValue),
    class3: obj.class3.arrayValue.values.map((value) => value.stringValue),
    class4: obj.class4.arrayValue.values.map((value) => value.stringValue),
    class5: obj.class5.arrayValue.values.map((value) => value.stringValue),
    class6: obj.class6.arrayValue.values.map((value) => value.stringValue),
    class7: obj.class7.arrayValue.values.map((value) => value.stringValue),
  };

  return formattedObj;
};
