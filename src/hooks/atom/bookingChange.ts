import { atom } from 'recoil';

// bookingChange 表示用 State
export type BookingChangeState = {
  yearBefChange: number;
  monthBefChange: number;
  dayBefChange: number;
  classBefChange: string;
  yearAftChange: number;
  monthAftChange: number;
  dayAftChange: number;
  classAftChange: string;
};

export const bookingChangeState = atom<BookingChangeState>({
  key: 'bookingChangeState',
  default: {
    yearBefChange: 0,
    monthBefChange: 0,
    dayBefChange: 0,
    classBefChange: '',
    yearAftChange: 0,
    monthAftChange: 0,
    dayAftChange: 0,
    classAftChange: '',
  },
});
