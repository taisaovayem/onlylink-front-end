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
    .post<never>('/api/v1/auth/revoke-token', {
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

export function revokeAllToken() {
  return httpClient
    .post<never>('/api/v1/auth/revoke-token', {})
    .then(rs => rs?.data);
}

type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export function register(data: RegisterRequest) {
  return httpClientWithoutAuthorization
    .post<LoginResponse>('/api/v1/auth/register', data)
    .then(rs => rs?.data);
}

export function changePassword(password: string) {
  return httpClient
    .post<never>('/api/v1/auth/change-password', { password })
    .then(rs => rs?.data);
}

type UpdateInfoRequest = Omit<RegisterRequest, 'password'>;
export function updateInfo(data: UpdateInfoRequest) {
  return httpClient
    .put<UserResponse>('/api/v1/auth/update-info', data)
    .then(rs => rs?.data);
}
