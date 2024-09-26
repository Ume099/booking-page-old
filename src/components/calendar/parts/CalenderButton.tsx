import { IconType } from 'react-icons';
import { ImSpinner7 } from 'react-icons/im';

/**
 * Props:
 *   variant : ボタンのスタイルのタイプ
 *   label   : ボタンのテキスト
 *   Icon    : React Icon のアイコン [optional]
 *   loading : ローディング状態
 */

type ButtonType = 'booked' | 'vacant' | 'available';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: ButtonType;
  label?: string;
  Icon?: IconType;
  loading?: boolean;
};
('active:translate-y-[2px] active:shadow-none [box-shadow:2px_2px_2px_#a3a3a3] ');

// ボタン本体
const CalenderButton = (props: ButtonProps): JSX.Element => {
  const { buttonType, label, Icon, loading, className = '', ...buttonHTMLAttributes } = props;
  // variant でボタンの色を分岐
  const btnClass =
    buttonType === 'booked'
      ? 'font-bold border-primary bg-primary text-white disabled:border-theme-medium disabled:bg-theme-medium shadow-md'
      : buttonType === 'vacant'
      ? `border-primary bg-gray-100 text-primary disabled:border-theme-medium disabled:text-theme-medium shadow-none`
      : buttonType === 'available'
      ? 'shadow-md'
      : '';

  // Component
  return (
    <>
      <button
        {...buttonHTMLAttributes}
        className={`relative flex items-center justify-center gap-1 rounded-full border px-6 py-3 text-center text-base transition-all duration-200 ease-linear hover:opacity-70 disabled:opacity-100 ${
          loading ? 'opacity-70 [&>span]:!text-transparent' : ''
        } ${btnClass} ${className}`}
      >
        {Icon && (
          <span>
            <Icon size={18} />
          </span>
        )}
        {label && <span>{label}</span>}

        {loading && <ButtonLoading />}
      </button>

      {loading && <LoadingLayer />}
    </>
  );
};

export default CalenderButton;

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
