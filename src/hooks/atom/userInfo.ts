import { atom } from 'recoil';

// userInfo 表示用 State
export type UserInfo = {
  uid: string;
  isSignedIn: boolean;
  userName: string | null;
  standardDay: string;
  educationStage: string;
  grade: number;
};

export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    uid: '',
    isSignedIn: false,
    userName: '',
    standardDay: '',
    educationStage: '',
    grade: 0,
  },
});
