import { atom } from 'recoil';

import { __log } from '@/lib/util/log';

// ダイアログの種類
export const DialogTypes = {
  Message: 'message',
};
export type DialogType = (typeof DialogTypes)[keyof typeof DialogTypes];

// ボタンへの設定
export type MessageDialogAction = {
  handleClick: () => void;
};

export type MessageDialogState = {
  title: string;
  content?: string | JSX.Element;
  dialogType: DialogType;
  isOpen: boolean;
  actions: MessageDialogAction[];
  labels?: (string | undefined)[];
};

export const messageDialogState = atom<MessageDialogState>({
  key: 'messageDialogState',
  default: {
    title: '',
    content: '',
    dialogType: DialogTypes.Message,
    isOpen: false,
    actions: [
      {
        handleClick: () => {
          __log('do nothing');
        },
      },
    ],
  },
});
