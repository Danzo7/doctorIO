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
  const authStore = useAuthStore.getState();

  try {
    console.log('refreshing ♻️....');

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
      console.log('refreshed 🌱.');
      authStore.setTokens({
        accessToken: refreshResult.access_token,
        refreshToken: refreshResult.refresh_token,
      });
      return true;
    } else throw new Error((refreshResult.error?.data as any)?.message);
  } catch (e: any) {
    //TODO understand why sometimes refresh fails
    // Maybe because of opening multiple tabs and refreshing them at the same time
    console.error('Lost the war ⚰️', e);
    //authStore.discard();
    useConnectionStore.getState().unreachable();
    return false;
  }
};

class DynamicBaseQuery {
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
          status: 503,
          data: {
            statusCode: 503,
            message:
              'The server is not responding. make sure the server is running',
            error: 'Service Unavailable',
          },
          statusText: 'Service Unavailable',
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
    if (
      result.error?.status == 401 &&
      (result.error?.data as any)?.errorCode != 1006
    ) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        const refreshed = await refreshTokens();
        if (refreshed) {
          result = await rawBaseQuery(args, api, extraOptions);
        }
        release();
      } else {
        await mutex.waitForUnlock();
        result = await rawBaseQuery(args, api, extraOptions);
      }
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
