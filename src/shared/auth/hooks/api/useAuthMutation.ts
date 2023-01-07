import { useAppMutation } from '@/shared/hooks/api';
import {
  login,
  logout,
  loginWithRefreshToken,
  revokeAllToken,
  register,
  changePassword,
  updateInfo,
} from '../../api';

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

export function useRevokeAllTokenMutation() {
  return useAppMutation({
    mutationFn: revokeAllToken,
  });
}

export function useRegisterMutation() {
  return useAppMutation({
    mutationFn: register,
  });
}

export function useChangePasswordMutation() {
  return useAppMutation({
    mutationFn: changePassword,
  });
}

export function useUpdateInfoMutation() {
  return useAppMutation({
    mutationFn: updateInfo,
  });
}
