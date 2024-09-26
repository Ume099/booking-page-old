import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';
import { BookingStatus, SeatMap } from '@/lib/SeatMap';
import { UserData } from '@/lib/userSettings';

type Props = {
  year: number;
  month: number;
  day: number;
};

// APIのレスポンスの型を定義
type FetchUsersResponse = UserData[];
type FetchSeatMapResponse = {
  _fieldsProto: any; // SeatMapのコンストラクタで扱うプロパティの型
};

// 関数コンポーネント
export default function SeatMapModal({ year, month, day }: Props) {
  const [bookingStatus, setBookingStatus] = useState<BookingStatus | undefined>(undefined);
  const [error, setError] = useState<string>('');
  const [isFetchUser, setIsFetchUser] = useState<boolean>(false);
  const [userInfo] = useRecoilState<UserInfo>(userInfoState);
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 全ユーザーを取得する
  const fetchUsers = async () => {
    setError('');
    try {
      const response = await axios.get<FetchUsersResponse>('/api/userActions/fetchUsers');
      setUsers(response.data);
      setIsFetchUser(true);
    } catch (error) {
      setError('Failed to fetch user');
    }
  };

  // レンダリング時に1度だけuserリストをfetch
  useEffect(() => {
    fetchUsers();
  }, []);

  // uidからdisplayNameを取得する関数
  const getDisplayNameList = (uid: string) => {
    const user = users.find((data) => data.uid === uid);
    return user?.displayName || 'Unknown';
  };

  const collectionNameInMemo = useMemo(() => 'openDay_' + year + '_' + month, [year, month]);

  // 座席表を取得するAPI
  const getOpenDayInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<FetchSeatMapResponse>('/api/booking/fetchSeatMap', {
        params: { collectionName: collectionNameInMemo, docId: 'day_' + day },
      });
      const item = response.data._fieldsProto;
      const seatMap = new SeatMap(item); // 型のキャストは不要
      setBookingStatus(seatMap as BookingStatus);
    } catch (error) {
      console.log(error);
      setError('Failed to fetch seat map');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOpenDayInfo();
  }, [collectionNameInMemo, day]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>
        Seat Map for {year}/{month}/{day}
      </h1>
      <div>
        {bookingStatus ? (
          <div>
            {/* 座席表の描画部分 */}
            <p>Booking Status: {JSON.stringify(bookingStatus)}</p>
            {/* ここで座席やユーザー情報などを表示できます */}
          </div>
        ) : (
          <p>No booking status available.</p>
        )}
      </div>
      {isFetchUser && (
        <div>
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.uid}>{getDisplayNameList(user.uid)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
