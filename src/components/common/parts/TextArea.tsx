import OptionalChip from '@/components/common/parts/OptionalChip';
import RequiredChip from '@/components/common/parts/RequiredChip';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn<any>;
};

const TextArea = (props: InputProps): JSX.Element => {
  const { label, isRequired, placeholder = '', className, register } = props;

  return (
    <div className="mb-4 flex w-full flex-col items-start gap-2">
      <label className="flex shrink-0 items-start justify-start md:justify-between" htmlFor={label}>
        <span className="text-base">{label}</span>
        {isRequired !== undefined && isRequired && <RequiredChip />}
        {isRequired !== undefined && !isRequired && <OptionalChip />}
      </label>
      <div className="w-full">
        <div className="w-full">
          <textarea
            id={label}
            {...register}
            placeholder={placeholder}
            className={`text-md w-full rounded border border-gray-300 px-1 py-1 text-gray-600 ${className}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TextArea;
