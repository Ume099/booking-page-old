import { initializeFirebaseApp } from '@/lib/firebase/firebase';
import '@/styles/globals.css';
import { RecoilRoot } from 'recoil';

import GoogleTagManager from '@/components/common/GoogleTagManager';
import MessageDialog from '@/components/common/MessageDialog';
import { googleTagManagerId } from '@/utils/gtm';

import Header from '@/components/common/Header';
import SideBar from '@/components/common/SideBar';
import { AuthProvider } from '@/feature/auth/provider/AuthProvider';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

initializeFirebaseApp();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GoogleTagManager googleTagManagerId={googleTagManagerId} />
      <RecoilRoot>
        <ChakraProvider>
          <AuthProvider>
            <Header />
            <div className="flex">
              <SideBar />
              <Component {...pageProps} />
            </div>
            <MessageDialog />
          </AuthProvider>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
export default MyApp;
