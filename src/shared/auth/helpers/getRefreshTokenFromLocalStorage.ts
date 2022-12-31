import { LocalStorage } from '@/shared/helpers';
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from '../models';

export function getRefreshTokenFromLocalStorage() {
  return LocalStorage.get<string>(REFRESH_TOKEN_KEY_NAME) ?? '';
}

export function getAccessTokenFromLocalStorage() {
  const accessToken = LocalStorage.get<string>(ACCESS_TOKEN_KEY_NAME);
  if (accessToken && accessToken !== 'undefined') {
    return accessToken;
  }
  return undefined;
}
