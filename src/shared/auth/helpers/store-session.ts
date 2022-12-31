import { LocalStorage } from '@/shared/helpers';
import {
  UserProfile,
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
  USER_PROFILE_KEY_NAME,
} from '../models';
import { getRefreshTokenFromLocalStorage } from './getRefreshTokenFromLocalStorage';

export function setAccessToken(accessToken: string): void {
  LocalStorage.set(ACCESS_TOKEN_KEY_NAME, accessToken);
}

export function getAccessToken(): string | undefined {
  return LocalStorage.get(ACCESS_TOKEN_KEY_NAME);
}

export function removeAccessToken(): void {
  LocalStorage.delete(ACCESS_TOKEN_KEY_NAME);
}

export function setRefreshToken(refreshToken: string): void {
  LocalStorage.set(REFRESH_TOKEN_KEY_NAME, refreshToken);
}

export function getRefreshToken(): string | undefined {
  return getRefreshTokenFromLocalStorage();
}

export function removeRefreshToken(): void {
  LocalStorage.delete(REFRESH_TOKEN_KEY_NAME);
}

export function setUserProile(profile: UserProfile): void {
  LocalStorage.set(USER_PROFILE_KEY_NAME, profile);
}

export function getUserProfile(): UserProfile | undefined {
  return LocalStorage.get<UserProfile>(USER_PROFILE_KEY_NAME);
}

export function removeUserProfile(): void {
  LocalStorage.delete(USER_PROFILE_KEY_NAME);
}
