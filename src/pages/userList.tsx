import ButtonOriginal from '@/components/common/parts/ButtonOriginal';
import { Box, Container, Heading, List, ListItem } from '@chakra-ui/react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import useSWR from 'swr';

interface UserData {
  uid: string;
  name?: string;
  email?: string;
  displayName?: string;
}

// データフェッチ用の fetcher 関数
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const UsersPage = () => {
  const { data: users, error, mutate } = useSWR<UserData[]>('/api/userActions/fetchUsers', fetcher);
  const [loading, setLoading] = useState<{ uid: string | null }>({ uid: null });
  const [loadingDelete, setLoadingDelete] = useState<{ uid: string | null }>({ uid: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ユーザーを削除する関数
  const deleteUser = async (uid: string) => {
    if (!window.confirm('ユーザーを削除するともとには戻せません。本当に削除しますか？')) return;

    setLoadingDelete({ uid });
    try {
      await fetch('/api/userActions/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
      });
      await removeUidFromAllClasses(uid);
      await removeUidFromSeatMap(uid);
      await mutate(); // ユーザー削除後に再フェッチしてリストを更新
    } catch (e) {
      console.error(e);
      setErrorMessage('Failed to delete user');
    } finally {
      setLoadingDelete({ uid: null });
    }
  };

  const removeUidFromAllClasses = async (uid: string) => {
    try {
      const response = await axios.post('/api/booking/deleteUidFromAllOpenDays', { uid });
      if (response.status === 200) {
        console.log(`Successfully removed UID ${uid} from all classes.`);
      } else {
        console.error(`Failed to remove UID ${uid}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing UID from classes:', error);
    }
  };

  const removeUidFromSeatMap = async (uid: string) => {
    try {
      const response = await axios.post('/api/booking/deleteUidFromSeatMap', { uid });
      if (response.status === 200) {
        console.log(`Successfully removed UID ${uid} from seat map.`);
      } else {
        console.error(`Failed to remove UID ${uid}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing UID from seat map:', error);
    }
  };

  // usersStateのdisplayNameに入力値をセットする関数
  const handleSetUserName = (uid: string, newValue: string) => {
    mutate(
      (prevUsers) =>
        prevUsers?.map((user) => (user.uid === uid ? { ...user, displayName: newValue } : user)) ||
        [],
      false,
    );
  };

  // usersStateのemailに入力値をセットする関数
  const handleSetEmail = (uid: string, newValue: string) => {
    mutate(
      (prevUsers) =>
        prevUsers?.map((user) => (user.uid === uid ? { ...user, email: newValue } : user)) || [],
      false,
    );
  };

  const updateUserEmail = async (uid: string) => {
    setLoading({ uid });
    try {
      const user = users?.find((user) => user.uid === uid);
      await axios.put('/api/userActions/updateEmail', {
        uid: uid,
        newEmail: user?.email || '',
      });
      setErrorMessage(null); // エラーをクリア
      await mutate(); // データの更新後に再フェッチ
    } catch (e) {
      console.error(e);
      setErrorMessage('Failed to update email');
    } finally {
      setLoading({ uid: null });
    }
  };

  // displayNameを更新する関数
  const updateUserDisplayName = async (uid: string) => {
    setLoading({ uid });
    try {
      const user = users?.find((user) => user.uid === uid);
      await axios.put('/api/userActions/updateUser', {
        uid: uid,
        displayName: user?.displayName || '',
      });
      setErrorMessage(null); // エラーをクリア
      await mutate(); // データの更新後に再フェッチ
    } catch (e) {
      console.error(e);
      setErrorMessage('Failed to update user');
    } finally {
      setLoading({ uid: null });
    }
  };

  if (error) {
    return <div>Failed to load users</div>;
  }

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <Container py={14}>
      <Heading mb={6}>Users List</Heading>
      <List spacing={3}>
        {users.map((user) => (
          <ListItem key={user.uid} borderWidth="1px" borderRadius="lg" p={4}>
            <div className="flex justify-between">
              <div>
                <Box>
                  <strong>Name:</strong>
                  <input
                    className="ml-2 rounded-lg border-2 px-3 py-2 text-gray-600"
                    placeholder="Enter display name"
                    onChange={(e) => handleSetUserName(user.uid, e.target.value)}
                    value={user.displayName || ''}
                  />
                </Box>
                <Box>
                  <strong>Email:</strong>
                  <input
                    className="ml-2 mt-2 rounded-lg border-2 px-3 py-2 text-gray-600"
                    placeholder="Enter email"
                    onChange={(e) => handleSetEmail(user.uid, e.target.value)}
                    value={user.email || ''}
                  />
                </Box>
                <Box>
                  <strong>ID:</strong> {user.uid}
                </Box>
              </div>
              <ButtonOriginal
                onClick={() => updateUserDisplayName(user.uid)}
                variant="secondary"
                label="更新"
                className="ml-4"
                loading={loading.uid === user.uid}
              />
              <ButtonOriginal
                onClick={() => updateUserEmail(user.uid)}
                variant="secondary"
                label="メールを更新"
                className="ml-4"
                loading={loading.uid === user.uid}
              />
              <ButtonOriginal
                onClick={() => deleteUser(user.uid)}
                variant="error-secondary"
                label="削除"
                className="ml-4"
                loading={loadingDelete.uid === user.uid}
              />
            </div>
            {/* TODO: 以下を正式なドメインに変更する */}
            <div>
              <QRCodeCanvas
                value={`https://www.alt-prime.com/createUser/firstLogIn?dummyMail=${
                  user.email ? user.email.replace('+', '___') : ''
                }&uid=${user.uid || ''}`}
                size={128}
                level={'L'}
                includeMargin={true}
                imageSettings={{
                  src: '/favicon.ico',
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
              <a
                href={`https://www.alt-prime.com/createUser/firstLogIn?dummyMail=${
                  user.email ? user.email.replace('+', '___') : ''
                }&uid=${user.uid || ''}`}
              >
                LINK
              </a>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UsersPage;
