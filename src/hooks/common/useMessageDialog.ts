import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { DialogTypes, MessageDialogState, messageDialogState } from '@/hooks/atom/messageDialog';

// hook の戻り値
// 各種ダイアログを open するための関数を返す
type UseMessageDialog = () => {
  dialog: MessageDialogState;
  //メッセージ表示用
  openMessageDialog: (openMessageDialogArgs: { title: string; content?: string }) => Promise<void>;
};

export const useMessageDialog: UseMessageDialog = () => {
  const [dialog, setMessageDialog] = useRecoilState(messageDialogState);

  const handleClose = useCallback(() => {
    setMessageDialog({
      ...dialog,
      isOpen: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openMessageDialog = useCallback(
    (openMessageDialogArgs: { title: string; content?: string }): Promise<void> => {
      const { title, content } = openMessageDialogArgs;
      return new Promise((resolve: () => void) => {
        const okAction = {
          handleClick: () => {
            handleClose();
            resolve();
          },
        };
        const state: MessageDialogState = {
          title: title,
          content: content,
          dialogType: DialogTypes.Message,
          isOpen: true,
          actions: [okAction],
        };
        setMessageDialog(state);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    dialog,
    openMessageDialog,
  };
};
