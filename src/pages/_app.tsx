import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { LandingLayout } from '@/layouts';
import { StoreProvider } from '@/store';
import * as React from 'react';
import { useRouter, Router } from 'next/router';
import { useWatchAuth } from '@/shared/auth/hooks';
import { landingPages } from '@/shared/auth/models';

import 'antd/dist/reset.css';

const MainApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  useWatchAuth();

  const render = React.useMemo(() => {
    if (landingPages.includes(pathname)) {
      return (
        <LandingLayout>
          <Component {...pageProps} />
        </LandingLayout>
      );
    }
    return (
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>
    );
  }, [Component, pageProps, pathname]);
  return render;
};

function OnlyLinkApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <MainApp
          Component={Component}
          pageProps={pageProps}
          router={router as unknown as Router}
        />
        {/* <ReactQueryDevtools /> */}
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default OnlyLinkApp;
