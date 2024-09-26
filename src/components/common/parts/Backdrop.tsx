import { ImSpinner3 } from 'react-icons/im';

import { useBackdrop } from '@/hooks/common/useBackdrop';

// 実行中の表示
const Backdrop = (): JSX.Element => {
  // ダイアログの情報と handleClose を hook ごしにもらう
  const { backdrop } = useBackdrop();
  // 一応 タイプを用意してあるが今は使用していない
  const { isOpen, message } = backdrop;

  return isOpen ? (
    <div className="fixed inset-0 z-[1001] bg-white/70">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2">
        <ImSpinner3 size={32} className="animate-spin text-theme" />
        {message && <span className="text-base text-theme">{message}</span>}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Backdrop;
