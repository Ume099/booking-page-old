import { RiCloseCircleFill } from 'react-icons/ri';

type Props = {
  isOpen: boolean;
  handleClose?: () => void;
  isMessageDialog?: boolean;
  className?: string; // tailwind の max-x-* クラスなどを設定する
  children: React.ReactNode;
};

const CommonDialog = (props: Props): JSX.Element => {
  const { isOpen, handleClose, isMessageDialog, className = 'max-w-xl', children } = props;
  return (
    <div
      className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/30 transition duration-200 ${
        isOpen ? 'visible block opacity-100' : 'invisible hidden opacity-0'
      } ${isMessageDialog ? 'z-[1000]' : 'z-[100]'}`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative m-4 max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-lg bg-white p-8 md:max-h-[calc(100vh-2rem)] ${className}`}
      >
        <RiCloseCircleFill
          size={24}
          className="absolute right-4 top-4 cursor-pointer text-gray-300 duration-300 hover:opacity-70"
          onClick={handleClose}
        />
        {children}
      </div>
    </div>
  );
};

export default CommonDialog;
