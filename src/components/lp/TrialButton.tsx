import { CgMail } from 'react-icons/cg';

import { Routes } from '@/lib/data/routes';

const TrialButton = (): JSX.Element => {
  return (
    <div className="flex w-full items-center justify-center bg-theme-light px-6 py-8 md:py-12 lg:py-16 xl:py-20">
      <a
        className="align-center relative flex w-full items-center justify-center gap-x-4 rounded-full bg-accent px-10 py-4 text-center text-center text-base font-bold text-white shadow-[6px_6px_6px_#00000033] duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_10px_#00000033] sm:w-auto sm:px-40 sm:py-6 sm:text-2xl xl:text-3xl"
        id="immediate-booking"
        href={Routes.GoogleForm.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CgMail />
        <span>無料体験会に予約</span>
      </a>
    </div>
  );
};

export default TrialButton;
