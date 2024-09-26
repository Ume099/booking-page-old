import { IconType } from 'react-icons';
import { IoMdClose } from 'react-icons/io';

import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import CalendarButton from '@/components/common/parts/CalendarButton';
import { MONTH_NAME } from '@/lib/date';

type Props = {
  setIsOpenSetmonthAndYearOnDisplayModal: (isOpenSetmonthAndYearModal: boolean) => void;
  setYearDecremented: () => void;
  yearOnDisplay: number;
  setYearIncremented: () => void;
  setMonth: (index: number) => void;
  errorYear: string;
};

const ChangeYearAndMonthModal = (props: Props) => {
  const {
    setIsOpenSetmonthAndYearOnDisplayModal,
    setYearDecremented,
    yearOnDisplay,
    setYearIncremented,
    setMonth,
    errorYear,
  } = props;

  // JSX
  return (
    <>
      <div className="px-auto max-w-sm lg:max-w-4xl">
        <div className="mt-[148px]"></div>
        <div className="fixed top-[60px] z-10 h-screen w-screen bg-gray-700 opacity-90">
          <div className="mt-12 px-6">
            <div className="flex gap-x-10">
              <button
                onClick={() => setIsOpenSetmonthAndYearOnDisplayModal(false)}
                className="disabled:opacity-1 } relative flex h-16 w-16 items-center justify-center gap-1 rounded-full border border-primary bg-white px-6 py-3 text-center text-base text-primary transition-all duration-200 ease-linear hover:opacity-70 disabled:border-theme-medium
                disabled:text-theme-medium"
              >
                <span>
                  <IoMdClose size={18} />
                </span>
              </button>
              <div className="z-10 w-full rounded-lg bg-white py-4 text-center">
                <div className=" flex items-center justify-center gap-x-10 ">
                  <ButtonOriginal
                    onClick={() => setYearDecremented()}
                    variant="secondary"
                    label="◀"
                    className="border-none text-4xl"
                  />
                  <div className="text-4xl">{yearOnDisplay}</div>
                  <ButtonOriginal
                    onClick={() => setYearIncremented()}
                    variant="secondary"
                    label="▶"
                    className="border-none text-4xl"
                  />
                </div>
                <div className="mt-2 min-h-8 text-red-600">{errorYear}</div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3">
              {MONTH_NAME.map((m, index) => (
                <div className="">
                  <ul className="">
                    <li key={index}>
                      <CalendarButton
                        key={index}
                        label={m}
                        variant="secondary"
                        onClick={() => setMonth(index + 1)}
                        className="w-24"
                      />
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeYearAndMonthModal;

type CalendarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  Icon?: IconType;
  loading?: boolean;
};

// ボタン本体
const CalendarButtonRow = (props: CalendarButtonProps): JSX.Element => {
  const { label, Icon, loading, className = '', ...buttonHTMLAttributes } = props;

  // Component
  return (
    <>
      <button
        onClick={setIsOpenSetmonthAndYearOnDisplayModal}
        {...buttonHTMLAttributes}
        className={`relative flex items-center justify-center gap-1 rounded-full border border-primary bg-white px-6 py-3 text-center text-base text-primary transition-all duration-200 ease-linear hover:opacity-70 disabled:border-theme-medium disabled:text-theme-medium disabled:opacity-100 ${
          loading ? 'opacity-70 [&>span]:!text-transparent' : ''
        } ${className}`}
      >
        {Icon && (
          <span>
            <Icon size={18} />
          </span>
        )}
        <span>{label}</span>
      </button>
    </>
  );
};
