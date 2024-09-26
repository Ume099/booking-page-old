import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  useToast,
} from '@chakra-ui/react';

import { urls, LinkNameList } from '@/pages';
import { useRecoilState } from 'recoil';
import PageListAfterSignIn from '@/components/common/parts/PageListAfterSignIn';
import { userInfoState } from '@/hooks/atom/userInfo';

import { FirebaseError } from '@firebase/util';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';

const linkList = urls.map((url, index) => {
  return { text: LinkNameList[index], link: url };
});

export const Page = (): NextPage => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      toast({
        title: 'ログインしました。',
        status: 'success',
        position: 'top',
      });
      //TODO: ログイン後のページに遷移の処理を書く
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
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

  return (
    <>
      {!userInfo.isSignedIn ? (
        <Container py={14}>
          <Heading>サインイン</Heading>
          <chakra.form onSubmit={handleSubmit}>
            <Spacer height={8} aria-hidden />
            <Grid gap={4}>
              <Box display={'contents'}>
                <FormControl>
                  <FormLabel>メールアドレス</FormLabel>
                  <Input
                    type={'email'}
                    name={'email'}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>パスワード</FormLabel>
                  <Input
                    type={'password'}
                    name={'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Spacer height={4} aria-hidden />
            <Center>
              <Button type={'submit'} isLoading={isLoading}>
                ログイン
              </Button>
            </Center>
          </chakra.form>
        </Container>
      ) : (
        <PageListAfterSignIn linkList={linkList} />
      )}
      ( )
    </>
  );
};

export default Page;
