import * as React from 'react';
import { useGuard } from './useGuard';
import { useRouter } from 'next/router';
import {
  getRefreshToken,
  getRefreshTokenFromLocalStorage,
  setAccessToken,
  setUserProile,
  getAccessTokenFromLocalStorage,
} from '@/shared/auth/helpers';
import { useStore } from '@/store';
import { useLoginWithRefreshTokenMutation } from './api';
import { LOGIN_ROUTE, notRequiredLoginPages } from '@/shared/auth/models';

export function useWatchAuth() {
  const { checkAuthStatus, refreshAuthStore } = useGuard();
  const router = useRouter();
  const {
    authStore: { loginStatus, setLoginStatus },
  } = useStore();
  const { mutateAsync } = useLoginWithRefreshTokenMutation();

  /** Checklogin first time open browser */
  React.useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      setLoginStatus('logged');
    } else {
      setLoginStatus('nologin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!notRequiredLoginPages.includes(router.pathname)) {
      const loggedIn = checkAuthStatus();
      const refreshToken = getRefreshTokenFromLocalStorage();
      if (
        !loggedIn &&
        loginStatus !== 'checking' &&
        loginStatus !== 'refreshing' &&
        refreshToken
      ) {
        setLoginStatus('refreshing');
        mutateAsync(refreshToken)
          .then(rs => {
            setAccessToken(rs.accessToken);
            setUserProile({ email: rs.email, name: rs.email });
            refreshAuthStore();
            setLoginStatus('logged');
          })
          .catch(() => setLoginStatus('nologin'));
      }
      if (loginStatus === 'nologin' || !getRefreshToken()) {
        router.push(LOGIN_ROUTE);
      }
    }
  }, [
    checkAuthStatus,
    loginStatus,
    mutateAsync,
    refreshAuthStore,
    router,
    setLoginStatus,
  ]);
}
