import { httpClient } from '@/shared/api';
import { UserResponse } from '@/shared/auth/models';

const CHANGE_PASSWORD_API_PATH = '/user/v1/authen/change-password';

type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export function changePassword(data: ChangePasswordRequest) {
  return httpClient
    .put<UserResponse>(CHANGE_PASSWORD_API_PATH, data)
    .then(rs => rs?.data);
}
