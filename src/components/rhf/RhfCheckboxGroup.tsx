import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import {
  FieldErrors,
  FieldName,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import CommonCheckbox, { CommonCheckboxProps } from '@/components/common/parts/CommonCheckbox';
import { Option } from '@/components/common/parts/CommonSelect';

type RhfCheckboxGroupProps<T extends FieldValues> = UseControllerProps<T> &
  CommonCheckboxProps & {
    options: Option[];
  };

const RhfCheckboxGroup = <T extends FieldValues>(props: RhfCheckboxGroupProps<T>): JSX.Element => {
  const { name, control, options, ...checkboxProps } = props;

  const {
    field: { onChange, value: checkedValue, ...restField },
    formState: { errors },
  } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValues = [...checkedValue];
    return e.target.checked
      ? Array.from(new Set([...checkedValues, e.target.value])) // チェックをつけた場合はその値を追加した配列を返す
      : [...checkedValues].filter((value) => value !== e.target.value); // チェックを外した場合はその値を削除した配列を返す
  };

  return (
    <div>
      {errors?.[name] && (
        <div className="mb-2 text-xs text-red-500">
          <ErrorMessage
            errors={errors}
            name={name as unknown as FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>}
          />
        </div>
      )}
      <div className="flex flex-col items-start">
        {options.map((option) => (
          <CommonCheckbox
            {...checkboxProps}
            {...restField}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(handleChange(e))}
            value={option.value}
            label={option.label}
            key={option.key}
          />
        ))}
      </div>
    </div>
  );
};

export default RhfCheckboxGroup;
