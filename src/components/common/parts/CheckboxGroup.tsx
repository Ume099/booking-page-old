import OptionalChip from '@/components/common/parts/OptionalChip';
import RequiredChip from '@/components/common/parts/RequiredChip';
import { UseFormRegister } from 'react-hook-form';

type CheckboxGroupProps<T> = {
  label?: string;
  optionList: T[];
  isRequired?: boolean;
  className?: string;
  register: UseFormRegister<any>;
  name: string;
};

const CheckboxGroup = <T,>({
  label,
  optionList,
  isRequired,
  className = '',
  register,
  name,
}: CheckboxGroupProps<T>) => {
  return (
    <div className="mb-4 flex flex-col items-start gap-2">
      {label && (
        <label className="flex items-start justify-between">
          <span className="text-base">{label}</span>
          {isRequired !== undefined && isRequired && <RequiredChip />}
          {isRequired !== undefined && !isRequired && <OptionalChip />}
        </label>
      )}
      <div className="w-full">
        {optionList.map((option, index) => (
          <label key={String(option) + index} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={String(option)}
              {...register(name)}
              className={`text-md rounded border-gray-300 ${className}`}
            />
            <span>{String(option)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
