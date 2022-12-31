import * as React from 'react';
import {
  SessionTimeOutError,
  MaintenanceServerError,
  ServerTimeOutError,
  ApiError,
} from '../../api';
import { useCallbackRef } from '../useCallbackRef';
import { useRouter } from 'next/router';
import { ACCESS_TOKEN_KEY_NAME, LOGIN_ROUTE } from '@/shared/auth/models';
import {
  removeAccessToken,
  removeRefreshToken,
  removeUserProfile,
} from '@/shared/auth/helpers';
import { LocalStorage } from '@/shared/helpers';

type HandleApiOptions = {
  onCommonError?: () => void;
};

export function useHandleApiError(option: HandleApiOptions = {}) {
  const onCommonErrorRef = useCallbackRef(option.onCommonError);
  const router = useRouter();

  const handleApiError = React.useCallback(
    (error: ApiError) => {
      if (error instanceof SessionTimeOutError) {
        LocalStorage.delete(ACCESS_TOKEN_KEY_NAME);
        removeAccessToken();
        removeRefreshToken();
        removeUserProfile();
        router.push(LOGIN_ROUTE);
        return;
      }
      if (error instanceof MaintenanceServerError) {
        // Hệ thống đang bảo trì, vui lòng thử lại sau!
        return;
      }
      if (error instanceof ServerTimeOutError) {
        // Hết thời gian phản hồi từ máy chủ!
        return;
      }

      if (onCommonErrorRef.current) {
        onCommonErrorRef.current();
      } else {
        // Lỗi máy chủ!
      }
    },
    [onCommonErrorRef, router],
  );

  return { handleApiError };
}
