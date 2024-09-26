import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// input に ref を渡すのに必要
// eslint-disable-next-line react/display-name
const CommonInput = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref): JSX.Element => {
    const { className = '', ...inputAttributes } = props;
    return (
      <input
        {...inputAttributes}
        ref={ref}
        className={`rounded-lg border border-black p-6 py-3 text-base outline-none placeholder:text-gray-300 focus:border-primary ${className}`}
      />
    );
  },
);

export default CommonInput;
