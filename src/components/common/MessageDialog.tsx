import Button from '@/components/common/parts/Button';
import CommonDialog from '@/components/common/parts/CommonDialog';
import { DialogTypes } from '@/hooks/atom/messageDialog';
import { useMessageDialog } from '@/hooks/common/useMessageDialog';

const MessageDialog = (): JSX.Element => {
  const { dialog } = useMessageDialog();
  const { title, content, dialogType, isOpen, actions } = dialog;

  // 通知メッセージ、本文あり
  if (dialogType == DialogTypes.Message && content) {
    return (
      <CommonDialog
        isOpen={isOpen}
        handleClose={actions[0].handleClick}
        isMessageDialog
        className="flex max-w-md flex-col items-center"
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-6 text-base">{content}</p>
        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            label="とじる"
            onClick={actions[0].handleClick}
            className="w-40"
          />
        </div>
      </CommonDialog>
    );
  }

  // 通知メッセージ、本文なし
  if (dialogType == DialogTypes.Message && content === undefined) {
    return (
      <CommonDialog
        isOpen={isOpen}
        handleClose={actions[0].handleClick}
        isMessageDialog
        className="flex max-w-md flex-col items-center"
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            label="とじる"
            onClick={actions[0].handleClick}
            className="w-40"
          />
        </div>
      </CommonDialog>
    );
  }

  // エラーメッセージ、本文なし
  return <></>;
};

export default MessageDialog;
