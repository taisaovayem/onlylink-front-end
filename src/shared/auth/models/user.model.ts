export type UserProfile = {
  email: string;
  name: string;
};
export interface UserResponse {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export type RefreshTokenResponse = UserResponse;