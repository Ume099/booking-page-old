import React, { forwardRef } from 'react';

export type CommonCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | React.ReactNode;
};

// input に ref を渡すのに必要
// eslint-disable-next-line react/display-name
const CommonCheckbox = forwardRef<HTMLInputElement, CommonCheckboxProps>(
  (props: CommonCheckboxProps, ref): JSX.Element => {
    const { label, ...inputProps } = props;

    return (
      <label className="relative inline-flex min-h-[48px] min-w-[48px] cursor-pointer items-start">
        <input
          {...inputProps}
          ref={ref}
          type="checkbox"
          className="peer absolute left-3 top-3 h-6 w-6 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-primary checked:bg-primary"
        />
        <span className="absolute left-0 top-0 block h-12 w-12 rounded-full bg-gray-500 opacity-0 transition-opacity content-[''] hover:opacity-10 peer-checked:bg-primary" />
        <div className="pointer-events-none absolute left-4 top-4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {label && <span className="ml-12 pt-3 text-base">{label}</span>}
      </label>
    );
  },
);

export default CommonCheckbox;
