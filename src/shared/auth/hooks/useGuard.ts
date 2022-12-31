import cloneDeep from 'lodash/cloneDeep';
import { useStore } from '@/store';

import { getAccessToken, getRefreshToken, getUserProfile } from '../helpers';

export function useGuard() {
  const { authStore } = useStore();

  function checkAuthStatus() {
    if (!authStore.accessToken && authStore.loginStatus === 'nologin')
      return false;
    if (!authStore.refreshToken && authStore.loginStatus === 'nologin')
      return false;
    if (authStore.loginStatus === 'nologin') return false;
    return true;
  }

  function refreshAuthStore() {
    const accessToken = getAccessToken();
    if (accessToken) {
      authStore.setAccessToken(accessToken);
    }
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      authStore.setRefreshToken(refreshToken);
    }
    const userProfile = getUserProfile();
    if (userProfile) {
      authStore.setUserProfile(cloneDeep(userProfile));
    }
  }

  function revokeAuthStore() {
    authStore.revokeAll();
  }

  return {
    checkAuthStatus,
    refreshAuthStore,
    revokeAuthStore,
  };
}
