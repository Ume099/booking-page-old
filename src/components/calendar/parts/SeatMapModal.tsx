import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import InputClass from '@/components/calendar/parts/InputClass';

import { BookingStatus, SeatMap } from '@/lib/SeatMap';

import { UserInfo, userInfoState } from '@/hooks/atom/userInfo';

import { MAX_SEAT_1, UserData } from '@/lib/userSettings';

type Props = {
  year: number;
  month: number;
  day: number;
};

// 関数コンポーネント
export default function SeatMapModal(props: Props) {
  const { year, month, day } = props;
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>();
  const [error, setError] = useState<string>('');
  const [isFetchUser, setIsFetchUser] = useState<boolean>(false);

  const [userInfo] = useRecoilState<UserInfo>(userInfoState);

  const [users, setUsers] = useState<UserData[]>([]);

  // 全ユーザーを取得する
  const fetchUsers = async () => {
    setError('');
    try {
      const response = await axios.get('/api/userActions/fetchUsers');

      setUsers(response.data);

      if (response.data) {
        setIsFetchUser(true);
      }
    } catch (error) {
      setError('Failed to fetch user');
    } finally {
    }
  };

  // レンダリング時に1度だけuserリストをfetch
  useEffect(() => {
    fetchUsers();
  }, []);

  // uidからdisplayNameを取得する関数
  const getDisplayNameList = (uid: string) => {
    const userInfo = users.filter((data) => data.uid === uid);
    return userInfo[0]?.displayName;
  };

  const collectionNameInMemo = useMemo(() => 'openDay_' + year + '_' + month, [year, month]);

  // 座席表を取得するAPI
  const getOpenDayInfo = async () => {
    try {
      const response = await axios.get('/api/booking/fetchSeatMap', {
        params: { collectionName: collectionNameInMemo, docId: 'day_' + day },
      });
      const item = response.data._fieldsProto;

      const seatMap = new SeatMap(item);

      setBookingStatus(seatMap);
    } catch (error) {
      console.log(error);
    }
  };

  // uidとdisplayNameの対応表を取得するAPI

  useEffect(() => {
    getOpenDayInfo();
  }, [collectionNameInMemo]);

  // bookingMapオブジェクトのclassごとの配列を空白削除して格納
  const class1List = bookingStatus?.bookingMap?.class1
    ? bookingStatus?.bookingMap?.class1?.filter((c: string) => c !== '')
    : [];
  const class2List = bookingStatus?.bookingMap?.class1
    ? bookingStatus?.bookingMap?.class2?.filter((c: string) => c !== '')
    : [];
  const class3List = bookingStatus?.bookingMap?.class1
    ? bookingStatus?.bookingMap?.class3?.filter((c: string) => c !== '')
    : [];
  const class4List = bookingStatus?.bookingMap?.class1
    ? bookingStatus?.bookingMap?.class4?.filter((c: string) => c !== '')
    : [];
  const class5List = bookingStatus?.bookingMap?.class1
    ? bookingStatus?.bookingMap?.class5?.filter((c: string) => c !== '')
    : [];
  const class6List = bookingStatus?.bookingMap?.class1
    ? bookingStatus?.bookingMap?.class6?.filter((c: string) => c !== '')
    : [];
  const class7List = bookingStatus?.bookingMap?.class1
    ? bookingStatus?.bookingMap?.class7?.filter((c: string) => c !== '')
    : [];

  const changeEventFunc = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      {!error && isFetchUser ? (
        // ボタンなど
        <div className="mb-8 flex w-full items-center justify-center">
          <div className="w-full">
            <div className="mx-auto mb-4 flex justify-center">
              <div className="mx-auto flex w-full items-center justify-center rounded-lg border-2 border-primary bg-white p-6 font-bold !opacity-100">
                <p className="text-center text-lg lg:text-xl">
                  {year}年{month}月{day}日の座席表 <br />
                </p>
              </div>
            </div>
            {/* 1クラス目 */}
            <div className="flex justify-center gap-x-4 rounded-lg border-2 border-primary">
              <div className="mx-auto flex w-full items-center justify-center bg-white p-2 !opacity-100">
                <div className="w-full">
                  <div className="mb-4 inline-block w-full text-center">
                    <div className="mb-4 grid gap-y-2">
                      <div className="w-full border px-3 py-2">
                        <p className="mb-2">class2</p>
                        {class1List.length <= MAX_SEAT_1 ? (
                          <>
                            {class1List.map((classInfo, index) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            {/* 予約が入っている場合は、MAX_SEAT_1-予約数の数だけ*/}
                            {Array.from({
                              length: class1List.length
                                ? MAX_SEAT_1 - class1List.length
                                : MAX_SEAT_1,
                            }).map((_, index) => (
                              <div className="mb-2">
                                <InputClass key={index} label="空席" />
                              </div>
                            ))}
                            {class1List.length === MAX_SEAT_1 && (
                              <p className="mt-2 text-red-300">
                                満席です。これ以上生徒を振替ないでください。
                              </p>
                            )}
                          </>
                        ) : (
                          <div>
                            {class1List.map((classInfo, index: number) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            <p className="font-bold text-red-500">座席が最大数を超過しています。</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2クラス目 */}
              <div className="mx-auto flex w-full items-center justify-center bg-white p-2 !opacity-100">
                <div className="w-full">
                  <div className="mb-4 inline-block w-full text-center">
                    <div className="mb-4 grid gap-y-2">
                      <div className="w-full border px-3 py-2">
                        <p className="mb-2">class1</p>
                        {class2List.length <= MAX_SEAT_1 ? (
                          <>
                            {class2List.map((classInfo, index) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            {/* 予約が入っている場合は、MAX_SEAT_1-予約数の数だけ*/}
                            {Array.from({
                              length: class2List.length
                                ? MAX_SEAT_1 - class2List.length
                                : MAX_SEAT_1,
                            }).map((_, index) => (
                              <div className="mb-2">
                                <InputClass key={index} label="空席" />
                              </div>
                            ))}
                            {class2List.length === MAX_SEAT_1 && (
                              <p className="mt-2 text-red-300">
                                満席です。これ以上生徒を振替ないでください。
                              </p>
                            )}
                          </>
                        ) : (
                          <div>
                            {class2List.map((classInfo, index: number) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            <p className="font-bold text-red-500">座席が最大数を超過しています。</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3クラス目 */}
              <div className="mx-auto flex w-full items-center justify-center bg-white p-2 !opacity-100">
                <div className="w-full">
                  <div className="mb-4 inline-block w-full text-center">
                    <div className="mb-4 grid gap-y-2">
                      <div className="w-full border px-3 py-2">
                        <p className="mb-2">class3</p>
                        {class3List.length <= MAX_SEAT_1 ? (
                          <>
                            {class3List.map((classInfo, index) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            {/* 予約が入っている場合は、MAX_SEAT_1-予約数の数だけ*/}
                            {Array.from({
                              length: class3List.length
                                ? MAX_SEAT_1 - class3List.length
                                : MAX_SEAT_1,
                            }).map((_, index) => (
                              <div className="mb-2">
                                <InputClass key={index} label="空席" />
                              </div>
                            ))}
                            {class3List.length === MAX_SEAT_1 && (
                              <p className="mt-2 text-red-300">
                                満席です。これ以上生徒を振替ないでください。
                              </p>
                            )}
                          </>
                        ) : (
                          <div>
                            {class3List.map((classInfo, index: number) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            <p className="font-bold text-red-500">座席が最大数を超過しています。</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4クラス目 */}
              <div className="mx-auto flex w-full items-center justify-center bg-white p-2 !opacity-100">
                <div className="w-full">
                  <div className="mb-4 inline-block w-full text-center">
                    <div className="mb-4 grid gap-y-2">
                      <div className="w-full border px-3 py-2">
                        <p className="mb-2">class4</p>
                        {class4List.length <= MAX_SEAT_1 ? (
                          <>
                            {class4List.map((classInfo, index) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            {/* 予約が入っている場合は、MAX_SEAT_1-予約数の数だけ*/}
                            {Array.from({
                              length: class4List.length
                                ? MAX_SEAT_1 - class4List.length
                                : MAX_SEAT_1,
                            }).map((_, index) => (
                              <div className="mb-2">
                                <InputClass key={index} label="空席" />
                              </div>
                            ))}
                            {class4List.length === MAX_SEAT_1 && (
                              <p className="mt-2 text-red-300">
                                満席です。これ以上生徒を振替ないでください。
                              </p>
                            )}
                          </>
                        ) : (
                          <div>
                            {class4List.map((classInfo, index: number) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            <p className="font-bold text-red-500">座席が最大数を超過しています。</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5講目 */}
              <div className="flex w-full items-center justify-center bg-white p-2 !opacity-100">
                <div className="w-full">
                  <div className="mb-4 inline-block w-full text-center">
                    <div className="mb-4 grid gap-y-2">
                      <div className="w-full border px-3 py-2">
                        <p className="mb-2">5講目</p>
                        {class5List.length <= MAX_SEAT_1 ? (
                          <>
                            {class5List.map((classInfo, index) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            {/* 予約が入っている場合は、MAX_SEAT_1-予約数の数だけ*/}
                            {Array.from({
                              length: class5List.length
                                ? MAX_SEAT_1 - class5List.length
                                : MAX_SEAT_1,
                            }).map((_, index) => (
                              <div className="mb-2">
                                <InputClass key={index} label="空席" />
                              </div>
                            ))}
                            {class5List.length === MAX_SEAT_1 && (
                              <p className="mt-2 text-red-300">
                                満席です。これ以上生徒を振替ないでください。
                              </p>
                            )}
                          </>
                        ) : (
                          <div>
                            {class5List.map((classInfo, index: number) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            <p className="font-bold text-red-500">座席が最大数を超過しています。</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6講目 */}
              <div className="mx-auto flex w-full items-center justify-center bg-white p-2 !opacity-100">
                <div className="w-full">
                  <div className="mb-4 inline-block w-full text-center">
                    <div className="mb-4 grid gap-y-2">
                      <div className="w-full border px-3 py-2">
                        <p className="mb-2">6講目</p>
                        {class6List.length <= MAX_SEAT_1 ? (
                          <>
                            {class6List.map((classInfo, index) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            {/* 予約が入っている場合は、MAX_SEAT_1-予約数の数だけ*/}
                            {Array.from({
                              length: class6List.length
                                ? MAX_SEAT_1 - class6List.length
                                : MAX_SEAT_1,
                            }).map((_, index) => (
                              <div className="mb-2">
                                <InputClass key={index} label="空席" />
                              </div>
                            ))}
                            {class6List.length === MAX_SEAT_1 && (
                              <p className="mt-2 text-red-300">
                                満席です。これ以上生徒を振替ないでください。
                              </p>
                            )}
                          </>
                        ) : (
                          <div>
                            {class6List.map((classInfo, index: number) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            <p className="font-bold text-red-500">座席が最大数を超過しています。</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 7講目 */}
              <div className="mx-auto flex w-full items-center justify-center bg-white p-2 !opacity-100">
                <div className="w-full">
                  <div className="mb-4 inline-block w-full text-center">
                    <div className="mb-4 grid gap-y-2">
                      <div className="w-full border px-3 py-2">
                        <p className="mb-2">7講目</p>
                        {class7List.length <= MAX_SEAT_1 ? (
                          <>
                            {class7List.map((classInfo, index) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            {/* 予約が入っている場合は、MAX_SEAT_1-予約数の数だけ*/}
                            {Array.from({
                              length: class7List.length
                                ? MAX_SEAT_1 - class7List.length
                                : MAX_SEAT_1,
                            }).map((_, index) => (
                              <div className="mb-2">
                                <InputClass key={index} label="空席" />
                              </div>
                            ))}
                            {class7List.length === MAX_SEAT_1 && (
                              <p className="mt-2 text-red-300">
                                満席です。これ以上生徒を振替ないでください。
                              </p>
                            )}
                          </>
                        ) : (
                          <div>
                            {class7List.map((classInfo, index: number) => (
                              <div key={index}>
                                <InputClass defaultVal={getDisplayNameList(classInfo)} />
                              </div>
                            ))}
                            <p className="font-bold text-red-500">座席が最大数を超過しています。</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-50 z-40 flex w-20 bg-white">{error}</div>
      )}
    </>
  );
}
