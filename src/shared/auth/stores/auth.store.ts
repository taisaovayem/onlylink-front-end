import { observable, action, makeObservable } from 'mobx';
import { UserProfile } from '../models';

const initialUserProfile: UserProfile = {
  email: '',
  name: '',
};

type LoginStatus = 'logged' | 'checking' | 'nologin' | 'init' | 'refreshing';

export class AuthStore {
  userProfile: UserProfile = initialUserProfile;
  accessToken = '';
  refreshToken = '';
  loginStatus: LoginStatus = 'init';

  constructor() {
    makeObservable(this, {
      userProfile: observable,
      accessToken: observable,
      refreshToken: observable,
      loginStatus: observable,
      setAccessToken: action,
      setRefreshToken: action,
      setUserProfile: action,
      setLoginStatus: action,
    });
  }

  setUserProfile = (userProfile: UserProfile) => {
    this.userProfile = userProfile;
  };
  setAccessToken = (accessToken: string) => {
    this.accessToken = accessToken;
  };
  setRefreshToken = (refreshToken: string) => {
    this.refreshToken = refreshToken;
  };
  revokeAll = () => {
    this.userProfile = initialUserProfile;
    this.accessToken = '';
    this.refreshToken = '';
    this.loginStatus = 'nologin';
  };

  setLoginStatus = (status: LoginStatus) => {
    this.loginStatus = status;
  };
}

export default new AuthStore();
