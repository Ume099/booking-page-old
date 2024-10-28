import { ChangeEvent } from 'react';

type ToggleProps = {
  label?: string;
  className?: string;
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ToggleSwitch = ({ label, className, isChecked, onChange }: ToggleProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-base">{label}</span>}
      <label className={`inline-flex cursor-pointer items-center ${className}`}>
        <input type="checkbox" checked={isChecked} onChange={onChange} className="hidden" />
        <span
          className={`toggle-switch block h-6 w-10 rounded-full p-1 transition-all duration-300 ease-in-out ${
            isChecked ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`toggle-knob block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
              isChecked ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
