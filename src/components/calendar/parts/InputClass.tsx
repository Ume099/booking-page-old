type Props = {
  label?: string;
  defaultVal?: string;
};

const InputClass = (props: Props): JSX.Element => {
  const { label = '', defaultVal = '' } = props;

  return (
    <div className="flex w-full items-start gap-4">
      <label className="flex shrink-0 items-start justify-start gap-2 md:justify-between">
        <span className="text-base">{label}</span>
      </label>
      <input placeholder={defaultVal} className="w-full rounded-lg border-2 px-3 py-2 text-gray-600" />
    </div>
  );
};

export default InputClass;
