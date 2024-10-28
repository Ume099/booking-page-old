import { UseFormRegisterReturn } from 'react-hook-form';

type OptionObjList = {
  value: string;
  optionName: string;
};

type Props = {
  label?: string;
  optionObjList: OptionObjList[];
  selectedIndex?: number;
  className?: string;
  register?: UseFormRegisterReturn<any>;
};

const SelectObject = ({
  label,
  optionObjList,
  selectedIndex = 0,
  className,
  register,
}: Props): JSX.Element => {
  return (
    <div className="mb-4 flex flex-col items-start gap-2">
      <label className="flex shrink-0 items-start justify-start md:justify-between">
        <span className="text-base">{label}</span>
      </label>
      <div className="w-full">
        <select
          defaultValue={optionObjList[selectedIndex]?.value || ''}
          {...register}
          className={`text-md w-full rounded border border-gray-300 px-1 py-1 text-gray-600 ${className}`}
        >
          {optionObjList.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.optionName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectObject;
