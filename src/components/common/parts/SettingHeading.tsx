/**
 * Props:
 *   variant : ボタンのスタイルのタイプ
 *   label   : ボタンのテキスト
 *   Icon    : React Icon のアイコン [optional]
 *   loading : ローディング状態
 */

export type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  label: string;
};

// ボタン本体
const SettingHeading = (props: Props): JSX.Element => {
  const { label, ...headingHTMLAttributes } = props;
  // Component
  return (
    <h2
      className="mb-4 w-full border-b-2 border-gray-600 text-xl font-bold"
      {...headingHTMLAttributes}
      id={`#${label}`}
    >
      {label}
    </h2>
  );
};

export default SettingHeading;
