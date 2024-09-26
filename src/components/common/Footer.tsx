import Image from 'next/image';
import Link from 'next/link';

import { Routes } from '@/lib/data/routes';

//   Routes.TOKUSHOHO,は一旦削除
const footerRouteList = ['test', 'test', 'test'];

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-theme-dark py-14 text-white sm:py-20">
      <div className="mb-10 flex justify-center">
        <Link href={Routes.INDEX.url}>
          <Image src="/lp/util/logo_android.png" width={32} height={32} alt="プライム" />
        </Link>
      </div>
      {/* ナビゲーション */}
      <nav>
        <ul className="flex flex-col flex-wrap items-center justify-center gap-6 px-6 md:flex-row md:items-start">
          {footerRouteList.map((key) => (
            <li key={key}>
              <Link href="#" className="block text-sm duration-300 hover:opacity-70 md:text-base">
                title
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <small className="mt-12 block text-center text-xs sm:mt-6">&copy; 2024 PRIME</small>
    </footer>
  );
};

export default Footer;
