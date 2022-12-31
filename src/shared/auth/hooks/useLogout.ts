import {
  removeAccessToken,
  removeRefreshToken,
  removeUserProfile,
  getRefreshTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
} from '../helpers';
import { ACCESS_TOKEN_KEY_NAME, LOGIN_ROUTE } from '../models';
import Cookie from 'js-cookie';
import { useStore } from '@/store';
import { useLogoutMutation } from './api/useAuthMutation';
import { useRouter } from 'next/router';

export function useLogout() {
  const {
    authStore: { revokeAll },
  } = useStore();
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();

  function logout() {
    const accessToken = getAccessTokenFromLocalStorage() ?? '';
    const refreshToken = getRefreshTokenFromLocalStorage();
    mutateAsync({ accessToken, refreshToken }).then(() => {
      Cookie.remove(ACCESS_TOKEN_KEY_NAME);
      removeAccessToken();
      removeRefreshToken();
      removeUserProfile();
      revokeAll();
      router.push(LOGIN_ROUTE);
    });
  }
  return { logout };
}
