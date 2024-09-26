import { IconType } from 'react-icons';

/**
 * Props:
 *   variant : ボタンのスタイルのタイプ
 *   label   : ボタンのテキスト
 *   Icon    : React Icon のアイコン [optional]
 *   loading : ローディング状態
 */

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  label?: string;
  Icon?: IconType;
  loading?: boolean;
};

// ボタン本体
const TestButton = (props: ButtonProps): JSX.Element => {
  const {
    variant = 'primary',
    label = 'test',
    Icon,
    loading,
    className = '',
    ...buttonHTMLAttributes
  } = props;

  // variant でボタンの色を分岐
  const btnColor =
    variant === 'primary'
      ? 'border-primary bg-primary text-white disabled:border-theme-medium disabled:bg-theme-medium'
      : variant === 'secondary'
      ? 'border-primary bg-white text-primary disabled:border-theme-medium disabled:text-theme-medium'
      : '';

  // Component
  return (
    <>
      <button
        {...buttonHTMLAttributes}
        className={`relative flex items-center justify-center gap-1 rounded-full border px-6 py-3 text-center text-base transition-all duration-200 ease-linear hover:opacity-70 disabled:opacity-100 ${
          loading ? 'opacity-70 [&>span]:!text-transparent' : ''
        } ${btnColor} ${className}`}
      >
        {Icon && (
          <span>
            <Icon size={18} />
          </span>
        )}
        <span>{label}</span>
      </button>
    </>
  );
};

export default TestButton;
