import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn<any>;
  withDefaultValue?: boolean;
};

const today = new Date();

// date型の今日日付からdefaultValueにあったstring形式の日付を取得する関数
const getDefaultValue = (date: Date): string => {
  const defaultValue = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
    '0' + date.getDate()
  ).slice(-2)}`;

  return defaultValue;
};

const todayValue = getDefaultValue(today);

const DatePicker = (props: InputProps): JSX.Element => {
  const { label, placeholder = '', className, register, withDefaultValue = false } = props;

  return (
    <div className="mb-4 flex flex-col items-start gap-2">
      <label className="flex shrink-0 items-start justify-start md:justify-between" htmlFor={label}>
        <span className="text-base">{label}</span>
      </label>
      <div>
        <input
          defaultValue={withDefaultValue ? todayValue : ''}
          type="date"
          id={label}
          {...register}
          placeholder={placeholder}
          className={`text-md w-full rounded border border-gray-300 px-1 py-1 text-gray-600 ${className}`}
        />
      </div>
    </div>
  );
};

export default DatePicker;
