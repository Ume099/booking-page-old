import { atom } from 'recoil';

type BookingChangeInfo = {
  classBefChange: string;
  classAftChange: string;
};

// bookingChange 表示用 State
export type BookingChangeInfoState = {
  classChangeInfo: BookingChangeInfo[];
};

export const bookingChangeInfoState = atom<BookingChangeInfoState>({
  key: 'bookingChangeInfoState',
  default: {
    classChangeInfo: [{ classBefChange: '', classAftChange: '' }],
  },
});
