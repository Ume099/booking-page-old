import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { linkList } from './Header';

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="">
      <div className="md:hidden">
        {!isOpen ? (
          <>
            {/* 三本線 */}
            <div className="fixed left-4 top-4 z-50 rounded-full" onClick={() => handleClickOpen()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                role="img"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                ></path>
              </svg>
            </div>
          </>
        ) : (
          // ×
          <>
            <div className="fixed left-0 top-0 z-[2] h-screen w-screen bg-gray-800"></div>
            <div className="fixed z-30 mr-8">
              <div className="h-full w-[240px] overflow-y-scroll">
                {linkList.map((link, key) => (
                  <li key={key} className="list-none">
                    <Link
                      href={link.link}
                      className="flex h-12 w-full items-center rounded-lg border-2 bg-gray-100 px-4 py-2 text-gray-800 transition duration-150 ease-in-out hover:underline focus:border-gray-800 focus:text-gray-400 focus:underline lg:h-full lg:w-auto lg:border-0 lg:border-gray-200  lg:bg-white lg:hover:no-underline lg:focus:no-underline"
                    >
                      <AiOutlineHome className="mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </div>
              <div
                className="fixed left-4 top-4 z-30 rounded-full duration-75"
                onClick={() => handleClickOpen()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="hidden md:inline-block">
        <div className="mr-8 flex">
          <div className="h-full w-[240px] overflow-y-scroll">
            {linkList.map((link, key) => (
              <li key={key} className="list-none">
                <Link
                  href={link.link}
                  className="flex h-full w-auto items-center rounded-lg border-0 border-gray-200 bg-white px-4  py-2 text-gray-800 transition duration-150 ease-in-out hover:no-underline focus:border-gray-800  focus:text-gray-400 focus:underline"
                >
                  <AiOutlineHome className="mr-2" />
                  {link.name}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
