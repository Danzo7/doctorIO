/* eslint-disable @typescript-eslint/naming-convention */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/auth' }),
  endpoints: (builder) => ({
    register: builder.mutation<
      {
        secretKey: string;
        id: number;
        access_token: string;
        refresh_token: string;
      },
      {
        invKey?: string;
        body: {
          userId: string;
          name: string;
          age: number;
          gender: 'male' | 'female';
          phone?: string;
          address?: string;
          publicKey?: string;
        };
      }
    >({
      query: ({ invKey, body }) => {
        return {
          url: `/register?key=${invKey}`,
          method: 'POST',
          body: { ...body },
          cache: 'no-cache',
        };
      },
    }),
    connectMember: builder.mutation<
      {
        access_token: string;
        refresh_token: string;
        id: number;
        secretKey: string;
      },
      { memberId: number; secretKey: string }
    >({
      query: (body) => {
        return {
          url: '/login',
          method: 'POST',
          body: { ...body },
          cache: 'no-cache',
        };
      },
    }),
  }),
});
export default authApi;
export const { useRegisterMutation, useConnectMemberMutation } = authApi;
