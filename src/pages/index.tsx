import { NextPage } from 'next';

import Layout from '@/components/common/Layout';
import { Routes } from '@/lib/data/routes';
import Link from 'next/link';
import { linkList } from '@/components/common/Header';

// URL配列を作成する関数
const getUrls = () => {
  return Object.values(Routes).map((route) => route.url);
};

const getLinkNameList = () => {
  return Object.values(Routes).map((route) => route.key);
};

// URL配列を取得
export const urls = getUrls();
export const LinkNameList = getLinkNameList();

const Home: NextPage = () => {
  return (
    <Layout
      path={Routes.INDEX.url}
      title={Routes.INDEX.title}
      noTitleTemplate={true}
      isTopPage={true}
    >
      <div className="relative mt-14">
        <div className="mx-12 mt-40 border-b-4">
          Links
          {linkList.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className="mx-12 mb-12 mt-6 flex rounded-md border bg-yellow-100 px-3 py-2 text-black"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
