import OptionalChip from '@/components/common/parts/OptionalChip';
import RequiredChip from '@/components/common/parts/RequiredChip';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  id?: string | undefined;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn<any>;
  defaultValue?: any;
};

const Input = (props: InputProps): JSX.Element => {
  const {
    label = '',
    isRequired,
    placeholder = '',
    className = '',
    register,
    id = 'none',
    defaultValue,
  } = props;

  return (
    <div className="mb-4 flex w-full flex-col items-start gap-2">
      <label className="flex shrink-0 items-start justify-start md:justify-between" htmlFor={label}>
        <span className="text-base">{label}</span>
        {isRequired !== undefined && isRequired && <RequiredChip />}
        {isRequired !== undefined && !isRequired && <OptionalChip />}
      </label>
      <div className="w-full">
        <div className="w-full">
          <input
            id={id}
            {...register}
            value={defaultValue}
            placeholder={placeholder}
            className={`text-md w-full rounded border border-gray-300 px-1 py-1 ${className}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
