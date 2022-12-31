import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Cookie from 'js-cookie';
import {
  ErrorResponse,
  CommonServerError,
  SessionTimeOutError,
  MaintenanceServerError,
  ServerTimeOutError,
} from './ApiError';
import {
  ACCESS_TOKEN_KEY_NAME,
  RefreshTokenResponse,
} from '@/shared/auth/models';
import { LocalStorage } from '@/shared/helpers';
import { ENV } from '@/shared/config';
import {
  getRefreshTokenFromLocalStorage,
  setUserProile,
} from '@/shared/auth/helpers';

export function getHeaderWithoutAuthorization() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding',
  };
}

function getHeader() {
  return {
    ...getHeaderWithoutAuthorization(),
    Authorization: 'Bearer ' + LocalStorage.get(ACCESS_TOKEN_KEY_NAME) ?? '',
  };
}

function getConfig(requireAuth: boolean, config?: AxiosRequestConfig) {
  return {
    ...config,
    headers: requireAuth
      ? {
          ...config?.headers,
          ...getHeader(),
        }
      : { ...config?.headers, ...getHeaderWithoutAuthorization() },
  };
}

class Request {
  private axiosClient: AxiosInstance;
  private requireAuth: boolean;
  constructor(config: AxiosRequestConfig, requireAuth: boolean) {
    this.axiosClient = axios.create(config);
    this.requireAuth = requireAuth;
  }

  handleError<T = never>(
    error: AxiosError<ErrorResponse>,
  ): Promise<AxiosResponse<T>> {
    if (error.response?.status === 401) {
      throw new SessionTimeOutError();
    }

    if (error.response?.status === 503) {
      throw new MaintenanceServerError();
    }

    if (error.response?.status === 408) {
      throw new ServerTimeOutError();
    }
    if (error.response?.status) {
      throw new CommonServerError(error.response?.data);
    }
    return Promise.resolve(undefined as unknown as AxiosResponse<T>);
  }

  getRefreshToken() {
    const refreshToken = getRefreshTokenFromLocalStorage();
    if (!refreshToken) return undefined;
    return this.axiosClient
      .post<RefreshTokenResponse>(
        '/api/v1/auth/access-token',
        {},
        {
          headers: {
            ...getHeaderWithoutAuthorization(),
            RefreshToken: refreshToken,
          },
        },
      )
      .then(rs => {
        if (rs.status === 401 || rs.status === 403) {
          throw new SessionTimeOutError();
        }
        setUserProile({
          email: rs.data.email,
          name: rs.data.name,
        });
        return rs.data.accessToken;
      })
      .catch(() => undefined);
  }

  get<T = never>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosClient
      .get<T>(url, getConfig(this.requireAuth, config))
      .catch(async (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          const accessToken = await this.getRefreshToken();
          if (accessToken) {
            Cookie.set(ACCESS_TOKEN_KEY_NAME, accessToken);
            return this.axiosClient.get<T>(
              url,
              getConfig(this.requireAuth, config),
            );
          }
        }
        return this.handleError<T>(error);
      });
  }

  post<T = never>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosClient
      .post<T>(url, data, getConfig(this.requireAuth, config))
      .catch(async (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          const accessToken = await this.getRefreshToken();
          if (accessToken) {
            Cookie.set(ACCESS_TOKEN_KEY_NAME, accessToken);
            return this.axiosClient.post<T>(
              url,
              data,
              getConfig(this.requireAuth, config),
            );
          }
        }
        return this.handleError(error);
      });
  }

  put<T = never>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosClient
      .put<T>(url, data, getConfig(this.requireAuth, config))
      .catch(async (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          const accessToken = await this.getRefreshToken();
          if (accessToken) {
            Cookie.set(ACCESS_TOKEN_KEY_NAME, accessToken);
            return this.axiosClient.put<T>(
              url,
              data,
              getConfig(this.requireAuth, config),
            );
          }
        }
        return this.handleError(error);
      });
  }

  patch<T = never>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosClient
      .patch<T>(url, data, getConfig(this.requireAuth, config))
      .catch(async (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          const accessToken = await this.getRefreshToken();
          if (accessToken) {
            Cookie.set(ACCESS_TOKEN_KEY_NAME, accessToken);
            return this.axiosClient.patch<T>(
              url,
              data,
              getConfig(this.requireAuth, config),
            );
          }
        }
        return this.handleError(error);
      });
  }

  delete<T = never>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosClient
      .delete<T>(url, getConfig(this.requireAuth, config))
      .catch(async (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          const accessToken = await this.getRefreshToken();
          if (accessToken) {
            Cookie.set(ACCESS_TOKEN_KEY_NAME, accessToken);
            return this.axiosClient.delete<T>(
              url,
              getConfig(this.requireAuth, config),
            );
          }
        }
        return this.handleError(error);
      });
  }
}

export const httpClient = new Request(
  {
    baseURL: ENV.onlylinkApi,
  },
  true,
);

export const httpClientWithoutAuthorization = new Request(
  {
    baseURL: ENV.onlylinkApi,
  },
  false,
);
