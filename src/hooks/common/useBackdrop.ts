import { useRecoilState } from 'recoil';

import { BackdropState, backdropState } from '@/hooks/atom/backdrop';

// Backdrop 表示用 hook
type UseBackdrop = () => {
  openBackdrop: (message?: string) => void;
  closeBackdrop: () => void;
  backdrop: BackdropState;
};

export const useBackdrop: UseBackdrop = () => {
  const [backdrop, setBackdrop] = useRecoilState(backdropState);

  const openBackdrop = (message?: string): void => {
    const state: BackdropState = {
      isOpen: true,
      message: message,
    };
    setBackdrop(state);
  };

  const closeBackdrop = (): void => {
    const state: BackdropState = {
      isOpen: false,
      message: '',
    };
    setBackdrop(state);
  };

  return {
    openBackdrop,
    closeBackdrop,
    backdrop,
  };
};
