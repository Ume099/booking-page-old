import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import { getAuth, signOut } from 'firebase/auth';
import { useRecoilState } from 'recoil';

import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { FirebaseError } from 'firebase/app';

type LinkObj = {
  text: string;
  link: string;
};

type Props = {
  linkList: LinkObj[];
};

const PageListAfterSignIn = (props: Props): JSX.Element => {
  const { linkList } = props;
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);

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

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-300 opacity-80">
        <div className=" rounded-lg border-2 border-primary bg-white px-10 py-10 shadow-lg">
          <h1 className="mb-4 font-bold text-primary">ログインに成功しました。</h1>
          <ul className="mb-4 grid grid-cols-1 gap-y-2 font-bold text-primary-dark">
            <li>
              <a href="/booking">予約ページへ移動</a>
            </li>
            <li>
              <a href="/">ホームへ移動</a>
            </li>
          </ul>
          <ButtonOriginal variant="error-secondary" label="ログアウト" onClick={handleSignOut} />
        </div>
      </div>
    </>
  );
};

export default PageListAfterSignIn;
