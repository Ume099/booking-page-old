import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { InputHTMLAttributes } from 'react';
import {
  FieldErrors,
  FieldName,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import CommonInput from '@/components/common/parts/CommonInput';

type RhfInputProps<T extends FieldValues> = UseControllerProps<T> & {
  InputComponent?: (props: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

const RhfInput = <T extends FieldValues>(props: RhfInputProps<T>): JSX.Element => {
  const { name, control, InputComponent = CommonInput, inputProps } = props;

  const {
    field,
    formState: { errors },
  } = useController({ name, control });

  return (
    <div>
      <InputComponent
        {...field}
        {...inputProps}
        className={`${errors?.[name] ? 'border-red-500 bg-red-50' : ''} ${
          inputProps?.className ?? ''
        }`}
      />
      {errors?.[name] && (
        <div className="mt-2 text-xs text-red-500">
          <ErrorMessage
            errors={errors}
            name={name as unknown as FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>}
          />
        </div>
      )}
    </div>
  );
};

export default RhfInput;
