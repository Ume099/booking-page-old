import { forwardRef } from 'react';

type TextProps = React.TextareaHTMLAttributes<HTMLElement>;

// input に ref を渡すのに必要
// eslint-disable-next-line react/display-name
const CommonTextarea = forwardRef<HTMLTextAreaElement, TextProps>(
  (props: TextProps, ref): JSX.Element => {
    const { className = '', ...textareaAttributes } = props;
    return (
      <textarea
        {...textareaAttributes}
        ref={ref}
        className={`rounded-lg border border-black px-6 py-3 text-base outline-none placeholder:text-gray-300 focus:border-primary sm:py-6 ${className}`}
      />
    );
  },
);

export default CommonTextarea;
