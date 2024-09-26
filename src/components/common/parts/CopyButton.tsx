import { FaCopy } from 'react-icons/fa6';

type Props = {
  isShowMessage?: boolean;
  isShowPromoteMessage?: boolean;
  messageToShow: string;
  textToCopy: string;
};

const CopyButton = (props: Props) => {
  const { isShowMessage, isShowPromoteMessage, messageToShow, textToCopy } = props;

  const clickHandler = async () => {
    const message = textToCopy;
    try {
      await navigator.clipboard.writeText(message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, no-console
      console.log('次の理由で失敗しました>>>>', error);
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        {isShowMessage && (
          <div className="animate-slide-in-bottom flex items-center text-red-500">
            {messageToShow}
          </div>
        )}
        {isShowPromoteMessage && !isShowMessage && (
          <div className="animate-slide-in-bottom flex items-center">タップしてコピー→</div>
        )}
        <button className="btn m-5 rounded bg-red-200 p-4" onClick={() => clickHandler()}>
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default CopyButton;
