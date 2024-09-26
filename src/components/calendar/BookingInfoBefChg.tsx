import { ImSpinner7 } from 'react-icons/im';

type Props = {
  date?: string;
  isLoading?: boolean;
  label?: string;
};

// ボタン本体
const BookingInfoBefChg = (props: Props): JSX.Element => {
  const { date, isLoading = false, label = '' } = props;
  // Component

  // 日付情報がわたってこない場合は、何もないdivを表示する
  if (!date) {
    return <div className="w-80 rounded-lg border-2 p-4">{label}</div>;
  }

  return (
    <>
      <div className="rounded-lg border-4">
        <div className="flex p-4">
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <div className="mr-4">
              <div>{date}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingInfoBefChg;

// ボタンのローディングアイコン
const ButtonLoading = () => {
  return (
    <div className="absolute text-center align-middle">
      <ImSpinner7 size="18px" className="animate-spin" />
    </div>
  );
};

// ローディング中に画面をクリックできないようにする
const LoadingLayer = () => {
  return <div className="fixed left-0 top-0 z-[999] h-screen w-screen bg-transparent" />;
};
