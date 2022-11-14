import { Logger } from '@libs/Logger';
import {
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { useAuthStore } from '@stores/authStore';
import { useConnectionStore } from '@stores/ConnectionStore';
import { Mutex } from 'async-mutex';
export const mutex = new Mutex();

export const refreshTokens = async () => {
  const release = !mutex.isLocked() ? await mutex.acquire() : undefined;
  if (!release) {
    await mutex.waitForUnlock();
    return true;
  }
  const authStore = useAuthStore.getState();
  try {
    Logger.log('refreshTokens', 'Refreshing tokens');
    const respond = await fetch(
      useConnectionStore.getState().getUrl() + '/auth/refresh',
      {
        method: 'POST',
        headers: new Headers({
          authorization: 'Bearer ' + authStore.refreshToken,
        }),
      },
    );

    if (!respond.ok) {
      throw new Error('refresh failed');
    }
    const refreshResult = await respond.json();
    if (refreshResult.access_token && refreshResult.refresh_token) {
      Logger.log('refreshTokens', 'Successfully refreshed tokens');
      authStore.setTokens({
        accessToken: refreshResult.access_token,
        refreshToken: refreshResult.refresh_token,
      });
      release();
      return true;
    } else throw new Error((refreshResult.error?.data as any)?.message);
  } catch (e: any) {
    //TODO SHow a detailed error to the user when this happen
    Logger.error('refreshTokens', 'Refreshing failed ⚰️:', e);
    //authStore.discard();
    useConnectionStore.getState().lock();
    release();
    return false;
  }
};

export class DynamicBaseQuery {
  resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  query: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any,
  ) => {
    if (!useConnectionStore.getState().url)
      return {
        error: {
          status: -1,
          data: {
            errorCode: -1,
            message: "The server's URL is not set",
          },
        },
      };
    await mutex.waitForUnlock();

    const baseUrl =
      'http://' + useConnectionStore.getState().url + '/' + this.resource + '/';

    const rawBaseQuery = fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: async (headers) => {
        const tokens = useAuthStore.getState();
        if (tokens.accessToken && tokens.refreshToken)
          headers.append(
            'Authorization',
            'Bearer ' +
              (extraOptions?.useRefresh
                ? tokens.refreshToken
                : tokens.accessToken),
          );
        return headers;
      },
    });

    let result = await rawBaseQuery(args, api, extraOptions);
    if ((result.error?.data as ServerError)?.errorCode == 1007) {
      const refreshed = await refreshTokens();
      if (refreshed) result = await rawBaseQuery(args, api, extraOptions);
    }
    return result;
  };
}

export class StaticQueries {
  static readonly authQuery = new DynamicBaseQuery('auth');

  static readonly queue = new DynamicBaseQuery('queue');

  static readonly appointment = new DynamicBaseQuery('record/appointment');

  static readonly medicalHistory = new DynamicBaseQuery('record/history');

  static readonly medicalDocument = new DynamicBaseQuery('record/document');

  static readonly patient = new DynamicBaseQuery('record/patient');

  static readonly roles = new DynamicBaseQuery('clinic/role');

  static readonly members = new DynamicBaseQuery('clinic/member');

  static readonly invitation = new DynamicBaseQuery('clinic/invite');

  static readonly clinic = new DynamicBaseQuery('clinic');
}
