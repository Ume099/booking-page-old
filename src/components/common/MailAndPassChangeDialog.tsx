import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { UserData } from '@/lib/userSettings';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

// emailがメアドとして使用可能かどうかを判定するコード
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// データフェッチ用の fetcher 関数
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MailAndPassChangeDialog = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [userInfo] = useRecoilState<UserInfo>(userInfoState);
  const auth = getAuth();
  const user = auth.currentUser;
  const { data: users, error, mutate } = useSWR<UserData[]>('/api/userActions/fetchUsers', fetcher);

  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const toast = useToast();

  const handleEmailChange = async () => {
    if (!user) return;
    await updateUserEmail(user.uid);
  };

  const updateUserEmail = async (uid: string) => {
    setLoading(true);
    if (!isValidEmail(email)) {
      toast({ title: '正しいメールアドレスを入力して下さい。', status: 'warning' });
      setLoading(false);
      return;
    }
    try {
      await axios.put('/api/userActions/updateEmail', {
        uid,
        newEmail: email || '',
      });
      await mutate(); // データの更新後に再フェッチ
    } catch (e) {
      console.error(e);
      toast({ title: 'メールアドレスの登録に失敗しました。', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!user || !newPassword || !userInfo.uid) {
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email!, userInfo.uid);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage('パスワードが更新されました');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setMessage(e.message);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300 opacity-80">
      <div className="rounded-lg border-2 border-primary bg-white px-10 py-10 shadow-lg">
        <h1 className="mb-4 font-bold text-primary">メールアドレス・パスワード変更</h1>

        <div className="mb-4">
          <label className="mb-2 block font-bold text-primary-dark">新しいメールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-2 border-gray-300 px-3 py-2 text-gray-600"
          />
          <ButtonOriginal
            variant="primary"
            label="メールアドレスを変更"
            onClick={handleEmailChange}
            loading={loading}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-bold text-primary-dark">現在のパスワード</label>
          <input
            type="password"
            value={userInfo.uid}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border-2 border-gray-300 px-3 py-2 text-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-bold text-primary-dark">新しいパスワード</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-md border-2 border-gray-300 px-3 py-2 text-gray-600"
          />
          <ButtonOriginal
            variant="primary"
            label="パスワードを変更"
            onClick={handlePasswordChange}
          />
        </div>

        {message && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default MailAndPassChangeDialog;
