import { IoMdClose } from 'react-icons/io';

import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import CalendarButton from '@/components/common/parts/CalendarButton';
import { MONTH_NAME } from '@/lib/date';

type Props = {
  month: number;
  year: number;
  handleSetMonth: (i: number) => void;
  handleIncrementYear: () => void;
  handleDecrementYear: () => void;
  handleCloseModal: () => void;
  errorYear: string;
};

const ChangeYMModal = (props: Props) => {
  const {
    month,
    year,
    handleDecrementYear,
    handleIncrementYear,
    handleSetMonth,
    handleCloseModal,
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
              <CalendarButton
                variant="secondary"
                onClick={handleCloseModal}
                Icon={IoMdClose}
                className="flex h-16 w-16 items-center justify-center text-center"
              />
              <div className="z-10 w-full rounded-lg bg-white py-4 text-center">
                <div className=" flex items-center justify-center gap-x-10 ">
                  <ButtonOriginal
                    onClick={handleDecrementYear}
                    variant="secondary"
                    label="◀"
                    className="border-none text-4xl"
                  />
                  <div className="text-4xl">{year}</div>
                  <ButtonOriginal
                    onClick={handleIncrementYear}
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
                        onClick={() => handleSetMonth(index + 1)}
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

export default ChangeYMModal;
