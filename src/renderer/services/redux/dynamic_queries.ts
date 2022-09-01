import {
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { Mutex } from 'async-mutex';
import { connected, unreachable } from './local/connectionStateSlice';

class DynamicBaseQuery {
  resource: string;

  baseUrl?: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  async loadUrl() {
    const { store } = await import('./store');
    const user = store?.getState?.()?.user;
    if (user.selectedClinic == undefined || user.clinic.length == 0)
      return undefined;
    const url = user.clinic[user.selectedClinic].serverLocation;
    try {
      const res = await fetch('http://' + url + '/status');
      if (!res.ok) {
        store.dispatch(unreachable());
        return undefined;
      } else store.dispatch(connected());
    } catch (e) {
      store.dispatch(unreachable());
      return undefined;
    }

    this.baseUrl = 'http://' + url + '/' + this.resource + '/';
    return this.baseUrl;
  }

  discardUrl() {
    this.baseUrl = undefined;
    return true;
  }

  async setUrl(url: string) {
    try {
      const res = await fetch('http://' + url + '/status');
      if (!res.ok) {
        return await Promise.reject('Not ok');
      }
    } catch (e) {
      return await Promise.reject('Not ok');
    }

    this.baseUrl = 'http://' + url + '/' + this.resource + '/';
    return this.baseUrl;
  }

  reset = () => {
    this.baseUrl = undefined;
  };

  query: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any,
  ) => {
    if (this.baseUrl == undefined)
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
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: this.baseUrl,
      prepareHeaders: async (headers, aps) => {
        const { store } = await import('./store');
        const tokens = (aps as unknown as typeof store).getState().authSlice;
        if (tokens.accessToken && tokens.refreshToken)
          headers.append(
            'Authorization',
            'Bearer ' + extraOptions?.useRefresh
              ? tokens.refreshToken
              : tokens.accessToken,
          );
        return headers;
      },
    });
    const result = await rawBaseQuery(args, api, extraOptions);

    return result;
  };
}
const mutex = new Mutex();
export const authQuery = new DynamicBaseQuery('auth');

export class StaticQueries {
  static readonly queue = new DynamicBaseQuery('queue');

  static readonly appointment = new DynamicBaseQuery('record/appointment');

  static readonly medicalHistory = new DynamicBaseQuery('record/history');

  static readonly medicalDocument = new DynamicBaseQuery('record/document');

  static readonly patient = new DynamicBaseQuery('record/patient');

  static async initAll() {
    if (await this.queue.loadUrl()) {
      this.patient.loadUrl();
      this.appointment.loadUrl();
      this.medicalHistory.loadUrl();
      this.medicalDocument.loadUrl();
    }
  }

  static resetAll() {
    StaticQueries.queue.reset();
    StaticQueries.appointment.reset();
    StaticQueries.medicalHistory.reset();
    StaticQueries.medicalDocument.reset();
    StaticQueries.patient.reset();
  }

  static async refreshAll() {
    if (await this.queue.loadUrl()) {
      this.appointment.loadUrl();
      this.medicalHistory.loadUrl();
      this.medicalDocument.loadUrl();
      this.patient.loadUrl();
      return true;
    } else return false;
  }
}
