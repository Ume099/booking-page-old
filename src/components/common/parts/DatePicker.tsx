import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn<any>;
};

const today = new Date();

const defaultValue = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${(
  '0' + today.getDate()
).slice(-2)}`;

const DatePicker = (props: InputProps): JSX.Element => {
  const { label, placeholder = '', className, register } = props;

  return (
    <div className="mb-4 flex flex-col items-start gap-2">
      <label className="flex shrink-0 items-start justify-start md:justify-between" htmlFor={label}>
        <span className="text-base">{label}</span>
      </label>
      <div>
        <input
          value={defaultValue}
          type="date"
          id={label}
          {...register}
          placeholder={placeholder}
          className={`text-md w-full rounded border border-gray-300 px-1 py-1 ${className}`}
        />
      </div>
    </div>
  );
};

export default DatePicker;
