import { Button, chakra, useToast } from '@chakra-ui/react';

import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { useRecoilState } from 'recoil';

import MailAndPassChangeDialog from '@/components/common/MailAndPassChangeDialog';
import { FirebaseError } from '@firebase/util';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export const Page = (): JSX.Element => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);

  const uid = searchParams.get('uid');
  const mail = searchParams.get('dummyMail')?.replace('___', '+');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!uid || !mail) {
      return; //何もしない
    }
    getUserIsFirstTime();
    setIsLoading(true);
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, mail, uid);
      toast({
        title: 'ログインしました。',
        status: 'success',
        position: 'top',
      });
      //TODO: ログイン後のページに遷移の処理を書く
    } catch (e) {
      toast({
        title: 'エラーが発生しました。管理者に問い合わせてください。',
        status: 'error',
        position: 'top',
      });
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // dbからユーザー情報を取得する関数
  const getUserIsFirstTime = async () => {
    let isError = false;
    let result: boolean;
    try {
      const res = await axios.get(`/api/fetchFireStore?collectionName=students&docId=${uid || ''}`);
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
    <div>
      {!userInfo.isSignedIn ? (
        <div className="py-12">
          <h2 className="text-center text-4xl font-bold">サインイン(初回ログイン)</h2>
          <chakra.form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col items-center justify-center gap-y-2">
              <Button className="mt-8 !h-24 w-48 " type="submit" isLoading={isLoading}>
                ログイン
              </Button>
              <div className="mt-4 flex">
                <p>二回目以降のサインインは</p>
                <a className="ml-2 font-bold underline" href="/signin">
                  こちら
                </a>
              </div>
            </div>
          </chakra.form>
        </div>
      ) : (
        <MailAndPassChangeDialog />
      )}
    </div>
  );
};

export default Page;
