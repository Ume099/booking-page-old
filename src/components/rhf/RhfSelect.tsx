import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import {
  FieldErrors,
  FieldName,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import CommonSelect, { CommonSelectProps } from '@/components/common/parts/CommonSelect';

type RhfSelectProps<T extends FieldValues> = UseControllerProps<T> & CommonSelectProps;

const RhfSelect = <T extends FieldValues>(props: RhfSelectProps<T>): JSX.Element => {
  const { name, control, options, divProps, selectProps, optionProps } = props;

  const {
    field,
    formState: { errors },
  } = useController({ name, control });

  return (
    <div>
      <CommonSelect
        options={options}
        divProps={divProps}
        selectProps={{
          ...field,
          ...selectProps,
          className: `${errors?.[name] ? 'border-red-500 !bg-red-50' : ''} ${
            field.value === '' ? 'text-gray-300' : ''
          } ${selectProps?.className ?? ''}`,
        }}
        optionProps={optionProps}
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

export default RhfSelect;
