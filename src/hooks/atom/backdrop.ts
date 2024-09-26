import { atom } from 'recoil';

// Backdrop 表示用 State
export type BackdropState = {
  isOpen: boolean;
  message?: string;
};

export const backdropState = atom<BackdropState>({
  key: 'backdropState',
  default: {
    isOpen: false,
    message: '',
  },
});
