import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectProps<T> = {
  optionList: T[];
  label?: string;
  register?: UseFormRegisterReturn<any>;
  value?: T;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

const Select = <T extends string | number | readonly string[]>({
  optionList,
  label,
  register,
  value,
  onChange,
  className,
}: SelectProps<T>) => {
  return (
    <div className={`mb-4 flex w-full flex-col items-start gap-2 ${className}`}>
      {label && <label className="text-base">{label}</label>}
      <select {...register} value={value} onChange={onChange} className="rounded border p-2">
        {optionList.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
