import { Routes } from '@/lib/data/routes';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

import { useEffect, useState } from 'react';

import type { UserInfo } from '@/hooks/atom/userInfo';

import { useAuthContext } from '@/feature/auth/provider/AuthProvider';
import { FirebaseError } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';

import { userInfoState } from '@/hooks/atom/userInfo';
import axios from 'axios';
import ButtonOriginal from './parts/ButtonOriginal';

export const linkList = [
  {
    name: 'HOME',
    link: '/',
  },
  {
    name: '指導報告書閲覧(全件)',
    link: '/teachingReport/showAllTeachingReport',
  },
  {
    name: '指導報告書閲覧',
    link: '/teachingReport/showTeachingReport',
  },
  {
    name: '指導報告書',
    link: '/teachingReport',
  },
  {
    name: '指導報告書テンプレート',
    link: '/teachingReport/createTemplate',
  },
  {
    name: '生徒新規登録',
    link: '/createUser/',
  },
  {
    name: '生徒初回ログイン画面',
    link: '/createUser/firstLogIn',
  },
  {
    name: '予約',
    link: '/booking',
  },
  {
    name: '座席表',
    link: '/seat-map',
  },
  {
    name: 'setOpenDays',
    link: '/set-open-days',
  },
  {
    name: 'apiTest',
    link: '/apiTest',
  },
  {
    name: 'logicTest',
    link: '/logicTest',
  },
  {
    name: 'Sign Up',
    link: '/signup',
  },
  {
    name: 'SignIn',
    link: '/signin',
  },
  {
    name: 'chat',
    link: '/chat',
  },
  {
    name: 'userList',
    link: '/userList',
  },
];

const Header: React.FC = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);
  const [loginMessage, setLoginMessage] = useState('未ログイン');

  // Auth周りの更新を自動で検知して実行
  useEffect(() => {
    const auth = getAuth();

    // ログイン状態が変化した時に実行される関数
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserInfo({
          uid: user.uid,
          isSignedIn: true,
          userName: user.displayName,
          isFirstTime: false,
        });
        setLoginMessage('としてログイン中');
      } else {
        // No user is signed in.
        setLoginMessage('未ログイン');
        setUserInfo({ ...userInfo, isSignedIn: false, userName: null });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const { user } = useAuthContext();
  //const router = useRouter();

  // サインアウトの関数
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    } finally {
      setUserInfo({ ...userInfo, isSignedIn: false });
    }
  };

  // dbからユーザー情報を取得する関数
  const getUserIsFirstTime = async () => {
    let isError = false;
    let result: boolean;
    try {
      const res = await axios.get(
        `/api/fetchFireStore?collectionName=students&docId=${userInfo.uid || ''}`,
      );
      console.log('getUserInfo', res.data.isFirstTime.booleanValue);
      result = res.data.isFirstTime.booleanValue;
    } catch (error) {
      isError = true;
      return; //何もしない
    }

    if (!isError) {
      setUserInfo({ ...userInfo, isFirstTime: result });
    }
  };

  return (
    <>
      {/* ヘッダー分の余白を生成 */}
      <div className="md:16 mt-20"></div>
      {/* ヘッダー本体 */}
      <header className="fixed top-0 z-[999] flex w-full justify-center shadow-md">
        <div className="w-4/5">
          <nav className="w-full bg-white">
            <div className="flex w-full items-center justify-between">
              <div className="block w-full">
                <ul className="select-none md:flex">
                  <li>
                    <div className="flex h-14 w-full items-center justify-between">
                      <div className="flex px-3"></div>

                      <Link href={Routes.INDEX.url} className="">
                        <Image
                          src="/lp/util/logo_long.png"
                          width={128}
                          height={64}
                          alt="プライム"
                        />
                      </Link>
                      <span>{userInfo && String(userInfo.userName) + 'としてログイン中'}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mr-16 flex w-full justify-end">
                <div className="">
                  {userInfo.isSignedIn && (
                    <div className="">
                      <ButtonOriginal
                        onClick={handleSignOut}
                        label="ログアウト"
                        variant="error"
                        className="bg-red-600 !py-0"
                      />
                    </div>
                  )}
                  {!user && (
                    <div className="h-wrap no-shrink mx-4 flex gap-x-4">
                      <Link
                        href="/signin"
                        className="self-center rounded-lg bg-primary-medium px-2 py-3"
                      >
                        ログイン
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 items-center md:pr-6">
              {!userInfo.isSignedIn && (
                <Link
                  href="/signin"
                  className="gradation-background menu-list self-center rounded px-8 py-3 md:mr-4"
                >
                  ログイン
                </Link>
              )}
              {!user && (
                <Link
                  href="/signup"
                  className="self-center rounded bg-yellow-400 px-8 py-3 font-semibold text-gray-800"
                >
                  新規登録
                </Link>
              )}
              {userInfo.userName ? (
                <form method="post" action="/signin">
                  <button
                    onClick={handleSignOut}
                    className="self-center rounded bg-red-600 !py-0 px-4 text-white"
                  >
                    ログアウト
                  </button>
                </form>
              ) : (
                <form method="post" action="/signin">
                  <button
                    onClick={handleSignOut}
                    className="self-center rounded bg-red-600 !py-0 px-4 text-white"
                  >
                    ログイン
                  </button>
                </form>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
