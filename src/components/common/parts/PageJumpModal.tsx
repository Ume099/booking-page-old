import ButtonOriginal from './ButtonOriginal';

type Props = {
  handleJumpEditPage: () => void;
  jumpStageText: {
    stage: string;
    topic: string;
    detail: string;
  };
  setIsOpenConfirmPageJump: () => void;
};

// 実行中の表示
const PageJumpModal = (props: Props): JSX.Element => {
  const { handleJumpEditPage, jumpStageText, setIsOpenConfirmPageJump } = props;
  return (
    <div>
      <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center">
        <div className="bg-gray fixed left-0 top-0 h-screen w-screen bg-gray-900 opacity-70"></div>
        <div className="z-40 rounded-lg bg-white px-4 py-6 text-center text-xl font-bold shadow-lg">
          ステージ <span className="font-bold text-red-700">{jumpStageText.stage}</span>{' '}
          の編集ページに移動しますか?
          <div className="gap mt-4 flex justify-center gap-x-2">
            <ButtonOriginal label="移動する" onClick={handleJumpEditPage}></ButtonOriginal>
            <ButtonOriginal
              variant="error-secondary"
              label="キャンセル"
              onClick={setIsOpenConfirmPageJump}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageJumpModal;
