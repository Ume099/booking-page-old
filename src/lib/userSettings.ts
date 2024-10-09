import { DayType } from './date';

export type UserSettings = {
  AUTHORITY: string;
  DummyEmail: string;
  biko: string;
  defaultPass: string;
  educationStage: string;
  uid: string;
  name: string;
  family: string;
  grade: number;
  standardDay: DayType;
};

export const inputsDefault = {
  AUTHORITY: '',
  DummyEmail: '',
  biko: '',
  defaultPass: '',
  educationStage: '',
  uid: '',
  name: '',
  family: '',
  grade: 0,
  standardDay: '',
};

// ユーザー一覧を取得するためのコード

interface ProviderData {
  uid: string;
  displayName?: string;
  email: string;
  providerId: string;
}

interface Metadata {
  lastSignInTime: string | null;
  creationTime: string;
  lastRefreshTime: string | null;
}

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  disabled: boolean;
  metadata: Metadata;
  passwordHash: string;
  passwordSalt: string;
  tokensValidAfterTime: string;
  providerData: ProviderData[];
}

export class UserList {
  list: { providerData: any }[];
  constructor(userInfo: any) {
    this.list = userInfo.map((data: { providerData: any }) => {
      data.providerData;
    });
  }
}

// ユーザー一覧を取得する際の型など
export type UserData = {
  uid: string;
  name?: string;
  email?: string;
  displayName?: string;
};

type ValueType = 'stringValue' | 'arrayValue';

interface Value {
  stringValue: string;
  valueType: ValueType;
}

type ArrayValue = {
  arrayValue: {
    values: any[]; // You can replace `any` with a more specific type if the array contents are known.
  };
  valueType: 'arrayValue';
};

export type BookedClassInfo = {
  class1: ArrayValue;
  class2: ArrayValue;
  class3: ArrayValue;
  class4: ArrayValue;
  class5: ArrayValue;
  class6: ArrayValue;
  class7: ArrayValue;
};

export type BookedClassInfoListObj = {
  class1: string[];
  class2: string[];
  class3: string[];
  class4: string[];
  class5: string[];
  class6: string[];
  class7: string[];
} | null;

// ApIから取得した予約状況をオブジェクトに詰めなおす関数
export const packBookedClassInfo = (bookedClassInfo: BookedClassInfo): BookedClassInfoListObj => {
  // 詰めなおす
  const obj = {
    class1: bookedClassInfo.class1?.arrayValue?.values.map((v) => v.stringValue),
    class2: bookedClassInfo.class2?.arrayValue?.values.map((v) => v.stringValue),
    class3: bookedClassInfo.class3?.arrayValue?.values.map((v) => v.stringValue),
    class4: bookedClassInfo.class4?.arrayValue?.values.map((v) => v.stringValue),
    class5: bookedClassInfo.class5?.arrayValue?.values.map((v) => v.stringValue),
    class6: bookedClassInfo.class6?.arrayValue?.values.map((v) => v.stringValue),
    class7: bookedClassInfo.class7?.arrayValue?.values.map((v) => v.stringValue),
  };
  return obj;
};

type StringValue = {
  stringValue: string;
  valueType: 'stringValue';
};

export type StudentClassInfoAll = {
  studentName: StringValue;
  studentNameFurigana: StringValue;
  guardianName: StringValue;
  guardianNameFurigana: StringValue;
  zipCode: StringValue;
  schoolCity: StringValue;
  note: StringValue;
  gender: StringValue;
  mainPhoneHolder: StringValue;
  mainPhoneNumber: StringValue;
  emergencyPhoneNumber: StringValue;
  teacher: StringValue;
  joinDate: StringValue;
  studentClassification: StringValue;
  NgTeacher: StringValue;
  toBanchi: StringValue;
  workPhoneNumber: StringValue;
  defaultClass: StringValue;
  payment: StringValue;
  subPhoneHolder: StringValue;
  ability: StringValue;
  schoolName: StringValue;
  workPlace: StringValue;
  exitDate: StringValue;
  group: StringValue;
  toDoHuKen: StringValue;
  period: StringValue;
  currentGrade: StringValue;
  subPhoneNumber: StringValue;
  emergencyContact: StringValue;
  subjects: ArrayValue;
  defaultDay: StringValue;
  birthDate: StringValue;
  givenNameFurigana: StringValue;
  buildingInfo: StringValue;
  AUTHORITY: StringValue;
  birthMonth: StringValue;
  schoolDivision: StringValue;
  guradianFamilyName: StringValue;
  birthYear: StringValue;
  broOrSisUid: StringValue;
  schoolToDoHuKen: StringValue;
  classStardDate: StringValue;
};

export type StudentClassInfoAllReturn = {
  zipCode: string;
  schoolCity: string;
  note: string;
  gender: string;
  guardianName: string;
  guardianNameFurigana: string;
  mainPhoneHolder: string;
  mainPhoneNumber: string;
  emergencyPhoneNumber: string;
  teacher: string;
  joinDate: string;
  studentClassification: string;
  NgTeacher: string;
  toBanchi: string;
  workPhoneNumber: string;
  defaultClass: string;
  payment: string;
  subPhoneHolder: string;
  ability: string;
  schoolName: string;
  workPlace: string;
  exitDate: string;
  group: string;
  toDoHuKen: string;
  period: string;
  currentGrade: string;
  subPhoneNumber: string;
  emergencyContact: string;
  subjects: string[];
  defaultDay: string;
  birthDate: string;
  givenNameFurigana: string;
  buildingInfo: string;
  AUTHORITY: string;
  birthMonth: string;
  schoolDivision: string;
  birthYear: string;
  broOrSisUid: string;
  schoolToDoHuKen: string;
  classStardDate: string;
};

// 生徒の基本データを詰め替える関数
export const fetchStudentClassInfoResponse = (
  obj: StudentClassInfoAll,
): StudentClassInfoAllReturn => {
  const returnObj = {
    zipCode: obj.zipCode.stringValue,
    schoolCity: obj.schoolCity.stringValue,
    note: obj.note.stringValue,
    gender: obj.gender.stringValue,
    mainPhoneHolder: obj.mainPhoneHolder.stringValue,
    mainPhoneNumber: obj.mainPhoneNumber.stringValue,
    emergencyPhoneNumber: obj.emergencyPhoneNumber.stringValue,
    teacher: obj.teacher.stringValue,
    joinDate: obj.joinDate.stringValue,
    studentClassification: obj.studentClassification.stringValue,
    NgTeacher: obj.NgTeacher.stringValue,
    toBanchi: obj.toBanchi.stringValue,
    workPhoneNumber: obj.workPhoneNumber.stringValue,
    studentName: obj.studentName.stringValue,
    defaultClass: obj.defaultClass.stringValue,
    payment: obj.payment.stringValue,
    subPhoneHolder: obj.subPhoneHolder.stringValue,
    ability: obj.ability.stringValue,
    guardianNameFurigana: obj.guardianNameFurigana.stringValue,
    schoolName: obj.schoolName.stringValue,
    workPlace: obj.workPlace.stringValue,
    exitDate: obj.exitDate.stringValue,
    group: obj.group.stringValue,
    toDoHuKen: obj.toDoHuKen.stringValue,
    period: obj.period.stringValue,
    currentGrade: obj.currentGrade.stringValue,
    subPhoneNumber: obj.subPhoneNumber.stringValue,
    emergencyContact: obj.emergencyContact.stringValue,
    subjects: obj.subjects.arrayValue.values,
    defaultDay: obj.defaultDay.stringValue,
    studentNameFurigana: obj.studentNameFurigana.stringValue,
    birthDate: obj.birthDate.stringValue,
    givenNameFurigana: obj.givenNameFurigana.stringValue,
    buildingInfo: obj.buildingInfo.stringValue,
    AUTHORITY: obj.AUTHORITY.stringValue,
    birthMonth: obj.birthMonth.stringValue,
    schoolDivision: obj.schoolDivision.stringValue,
    guardianName: obj.guardianName.stringValue,
    birthYear: obj.birthYear.stringValue,
    broOrSisUid: obj.broOrSisUid.stringValue,
    schoolToDoHuKen: obj.schoolToDoHuKen.stringValue,
    classStardDate: obj.classStardDate.stringValue,
  };

  return returnObj;
};

// 最大座席数（パターン1）
export const MAX_SEAT_1 = 4;

export const CURRENT_GRADE_LIST = [
  '-',
  '0歳',
  '1歳',
  '2歳',
  '3歳',
  '年少',
  '年中',
  '年長',
  '小学1年生',
  '小学2年生',
  '小学3年生',
  '小学4年生',
  '小学5年生',
  '小学6年生',
  '中学1年生',
  '中学2年生',
  '中学3年生',
  '高校1年生',
  '高校2年生',
  '高校3年生',
  '大学1年生',
  '大学2年生',
  '大学3年生',
  '大学4年生',
  '大学5年生',
  '修士1年生',
  '修士2年生',
  '博士1年生',
  '博士2年生',
  '博士3年生',
  '大学生',
  '社会人',
  '既卒',
  'その他',
];

export const STUDENT_CLASSIFICATION_LIST = [
  '-',
  '通塾生',
  '体験生',
  '講習生',
  '特別生',
  'その他外部利用',
];

export const GENDER_LIST = ['男性', '女性', 'その他', '未設定'];
export const GENDER_OBJ_LIST = [
  { value: 'male', label: GENDER_LIST[0] },
  { value: 'female', label: GENDER_LIST[1] },
  { value: 'others', label: GENDER_LIST[2] },
  { value: 'null', label: GENDER_LIST[3] },
];

export const BIRTH_YEAR_LIST: number[] = [0];

const date = new Date();
export const thisYear = date.getFullYear();

for (let i = thisYear; i >= 1900; i--) {
  BIRTH_YEAR_LIST.push(i);
}

export const BIRTH_MONTH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const BIRTH_DATE = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31,
];

// TypeScript のユーティリティ型
export type JapanPhoneNumber = string & { __type: 'JapanPhoneNumber' };

export const ABILITY_LIST = ['', '1', '3', '3下', '3上', '4', '5'];

const PERIOD = ['選択なし', '前後期制', '3学期生制', '4学期制'];

export const PERIOD_OBJ_LIST = [
  { value: 'none', label: PERIOD[0] },
  { value: 'zenkiKouki', label: PERIOD[1] },
  { value: 'sangakki', label: PERIOD[2] },
  { value: 'yongakki', label: PERIOD[3] },
];

export const PAYMENT_LIST = ['選択なし', '銀行振込', 'クレジットカード', '口座振り込み', '月謝'];

export type InputType = {
  studentName: string;
  studentNameFurigana: string;
  currentGrade: keyof typeof CURRENT_GRADE_LIST;
  defaultDay: string;
  defaultClass: string;
  studentClassification: keyof typeof STUDENT_CLASSIFICATION_LIST;
  gender: keyof typeof GENDER_LIST;
  birthYear: keyof typeof BIRTH_YEAR_LIST;
  birthMonth: keyof typeof BIRTH_MONTH;
  birthDate: keyof typeof BIRTH_DATE;
  mainPhoneHolder: string;
  mainPhoneNumber: JapanPhoneNumber;
  subPhoneHolder: string;
  subPhoneNumber: JapanPhoneNumber;
  zipCode: string;
  toDoHuKen: string;
  toBanchi: string;
  buildingInfo: string;
  broOrSisUid: string;
  guradianName: string;
  guradianNameFurigana: string;
  workPlace: string;
  workPhoneNumber: JapanPhoneNumber;
  emergencyContact: string;
  emergencyPhoneNumber: JapanPhoneNumber;
  teacher?: string;
  NgTeacher?: string;
  subjects: string[];
  ability: keyof typeof ABILITY_LIST;
  schoolDivision: string;
  schoolToDoHuKen: string;
  schoolCity: string;
  schoolName: string;
  period: keyof typeof PERIOD;
  group: string;
  payment: keyof typeof PAYMENT_LIST;
  note: string;
  guardianName: string;
  guardianNameFurigana: string;
  joinDate: Date;
  classStardDate: Date;
  exitDate: Date;
};

export const PREFECTURES = [
  '-',
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];

export const SUBJECT_LIST = [
  '国語',
  '算数',
  '理科',
  '社会',
  '英語',
  '現代文',
  '古文',
  '漢文',
  '日本史',
  '世界史',
  '政治・経済',
  '地理',
  '倫理',
  '生物',
  '物理',
  '化学',
  '地学',
  'リスニング',
  'ライティング',
  'スピーキング',
  'プログラミング',
];

export const schoolDevision = [
  '幼稚園',
  '保育園',
  'こども園',
  '小学校',
  '中学校',
  '高校',
  'その他',
];

export const SCHOOL_DIVISION_OBJ_LIST = [
  { value: 'kindergarden', label: schoolDevision[0] },
  { value: 'hoikuen', label: schoolDevision[1] },
  { value: 'kodomoen', label: schoolDevision[2] },
  { value: 'elementary', label: schoolDevision[3] },
  { value: 'junior_high', label: schoolDevision[4] },
  { value: 'high', label: schoolDevision[5] },
  { value: 'other', label: schoolDevision[6] },
];

export const DUMMY_GROUPS = ['-', '香) プログラミング', '姪) プログラミング'];
