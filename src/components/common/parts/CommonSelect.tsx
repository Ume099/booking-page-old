import {
  DetailedHTMLProps,
  HTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { RiArrowDropDownFill } from 'react-icons/ri';

export type Option = {
  key: string | number;
  label: string;
  value: string;
};

export type CommonSelectProps = {
  options: Option[];
  divProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  selectProps?: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
  optionProps?: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
};

const CommonSelect = (props: CommonSelectProps): JSX.Element => {
  const { options, divProps, selectProps, optionProps } = props;

  return (
    <div {...divProps} className="relative">
      <RiArrowDropDownFill
        size={32}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
      />
      <select
        {...selectProps}
        className={`w-full cursor-pointer appearance-none rounded-lg border border-black bg-white py-3 pl-6 pr-12 text-base outline-none placeholder:text-gray-300 focus:border-primary ${
          selectProps?.className ?? ''
        }`}
      >
        {options.map((option) => (
          <option {...optionProps} value={option.value} key={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommonSelect;
