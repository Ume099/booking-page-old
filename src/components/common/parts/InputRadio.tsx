import OptionalChip from '@/components/common/parts/OptionalChip';
import RequiredChip from '@/components/common/parts/RequiredChip';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label: string;
  options: { value: string; label: string }[]; // ラジオボタンの選択肢
  isRequired?: boolean;
  className?: string;
  register?: UseFormRegisterReturn;
};

const InputRadio = (props: Props): JSX.Element => {
  const { label, options, isRequired, className = '', register } = props;

  return (
    <div className={`mb-4 flex flex-col items-start gap-2 ${className}`}>
      <label className="flex shrink-0 items-start justify-start md:justify-between">
        <span className="text-base">{label}</span>
        {isRequired !== undefined && isRequired && <RequiredChip />}
        {isRequired !== undefined && !isRequired && <OptionalChip />}
      </label>
      <div className="flex w-full gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input type="radio" value={option.value} {...register} className="radio-input text-gray-600" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputRadio;
