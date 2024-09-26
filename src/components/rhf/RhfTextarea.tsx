import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { TextareaHTMLAttributes } from 'react';
import {
  FieldErrors,
  FieldName,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import CommonTextarea from '@/components/common/parts/CommonTextarea';

type RhfTextareaProps<T extends FieldValues> = UseControllerProps<T> & {
  TextareaComponent?: (props: TextareaHTMLAttributes<HTMLElement>) => JSX.Element;
  inputProps?: TextareaHTMLAttributes<HTMLElement>;
};

const RhfTextarea = <T extends FieldValues>(props: RhfTextareaProps<T>): JSX.Element => {
  const { name, control, TextareaComponent = CommonTextarea, inputProps } = props;

  const {
    field,
    formState: { errors },
  } = useController({ name, control });

  return (
    <div>
      <TextareaComponent
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

export default RhfTextarea;
