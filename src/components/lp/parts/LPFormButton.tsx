type LPFormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const LPFormButton = (props: LPFormButtonProps): JSX.Element => {
  const { label, ...buttonHTMLAttributes } = props;
  return (
    <button
      {...buttonHTMLAttributes}
      className="relative w-full rounded-full border-4 border-accent bg-white px-10 py-4 text-center text-base font-bold text-accent shadow-[6px_6px_6px_#00000033] duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_10px_#00000033] sm:w-auto sm:px-40 sm:py-6 sm:text-2xl xl:text-3xl"
    >
      <span>{label}</span>
    </button>
  );
};

export default LPFormButton;
