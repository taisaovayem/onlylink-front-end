import { httpClient, httpClientWithoutAuthorization } from '@/shared/api';
import { RefreshTokenResponse, UserResponse } from '../models';

export type LoginResponse = UserResponse;

type LoginRequest = {
  email: string;
  password: string;
};

export function login({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  return httpClientWithoutAuthorization
    .post('/api/v1/auth/login', {
      email,
      password,
    })
    .then(rs => rs?.data);
}

type LogoutRequest = {
  accessToken: string;
  refreshToken: string;
};

export function logout({ accessToken, refreshToken }: LogoutRequest) {
  return httpClient
    .post('/api/v1/auth/revoke-token', {
      accessToken,
      refreshToken,
    })
    .then(rs => rs?.data);
}

export function loginWithRefreshToken(refreshToken: string) {
  return httpClientWithoutAuthorization
    .post<RefreshTokenResponse>('/api/v1/auth/access-token', { refreshToken })
    .then(rs => {
      return rs?.data;
    });
}
