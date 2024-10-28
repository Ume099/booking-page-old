import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label?: string;
  register?: UseFormRegisterReturn<any>;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  register,
  placeholder = '',
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className="mb-4 flex w-full flex-col items-start gap-2">
      {label && <label className="text-base">{label}</label>}
      <input
        {...register}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded border p-2 text-gray-600 ${className}`}
      />
    </div>
  );
};

export default Input;
