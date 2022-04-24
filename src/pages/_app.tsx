import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { MainLayout, NotLoginLayout } from '../shared/layouts';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  if (pathname === '/login') {
    return (
      <NotLoginLayout>
        <Component {...pageProps} />
      </NotLoginLayout>
    );
  } else {
    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    );
  }
}

export default MyApp;
