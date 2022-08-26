import {
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

class DynamicBaseQuery {
  resource: string;

  baseUrl?: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  private async getBaseUrl() {
    const { store } = await import('./store');
    const user = store?.getState?.()?.user;
    if (!user.selectedClinic || !user.clinic) return undefined;
    const url = user.clinic[user.selectedClinic].serverLocation;
    const res = await fetch('http://' + url + '/status');
    if (!res.ok) {
      return undefined;
    }
    this.baseUrl = 'http://' + url + '/' + this.resource + '/';
    return this.baseUrl;
  }

  reset = () => {
    this.baseUrl = undefined;
  };

  async refresh() {
    this.reset();
    await this.getBaseUrl();
    return this.baseUrl != undefined;
  }

  query: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any,
  ) => {
    if (!this.baseUrl) await this.getBaseUrl();
    if (!this.baseUrl)
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

    const rawBaseQuery = fetchBaseQuery({ baseUrl: this.baseUrl });

    return rawBaseQuery(args, api, extraOptions);
  };
}
export class StaticQueries {
  static isWorking = true;

  static readonly queue = new DynamicBaseQuery('queue');

  static readonly appointment = new DynamicBaseQuery('record/appointment');

  static readonly medicalHistory = new DynamicBaseQuery('record/history');

  static readonly medicalDocument = new DynamicBaseQuery('record/document');

  static readonly patient = new DynamicBaseQuery('record/patient');

  static resetAll() {
    StaticQueries.queue.reset();
    StaticQueries.appointment.reset();
    StaticQueries.medicalHistory.reset();
    StaticQueries.medicalDocument.reset();
    StaticQueries.patient.reset();
  }

  static async refreshAll() {
    if (await StaticQueries.queue.refresh()) {
      StaticQueries.appointment.reset();
      StaticQueries.medicalHistory.reset();
      StaticQueries.medicalDocument.reset();
      StaticQueries.patient.reset();
      this.isWorking = true;
      return true;
    } else return false;
  }
}
