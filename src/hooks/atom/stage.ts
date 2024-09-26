import { atom } from 'recoil';

// ダイアログの種類
export const ReportTypes = {
  Stage: 'textStage',
};
// ボタンへの設定
export type MessageDialogAction = {
  handleClick: () => void;
};

export type TeachingReportType = {
  stage: string;
  topic: string;
  detail: string;
};

export const textState = atom<TeachingReportType>({
  key: 'textState',
  default: {
    stage: '',
    topic: '',
    detail: '',
  },
});
