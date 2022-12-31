import { useAppMutation } from '@/shared/hooks/api';
import { login, logout, loginWithRefreshToken } from '../../api';

export function useLoginMutation() {
  return useAppMutation({
    mutationKey: ['LOGIN'],
    mutationFn: login,
  });
}

export function useLogoutMutation() {
  return useAppMutation({
    mutationKey: 'LOGOUT',
    mutationFn: logout,
  });
}

export function useLoginWithRefreshTokenMutation() {
  return useAppMutation({
    mutationKey: 'REFRESH_TOKEN',
    mutationFn: loginWithRefreshToken,
  });
}
