/* eslint-disable @typescript-eslint/naming-convention */
import { parseInviteKey } from '@helpers/crypto/parse';
import { authQuery, StaticQueries } from '@redux/dynamic_queries';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { addNewClinic } from '../user/userSlice';
import { setTokens } from './authSlice';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authQuery.query,
  endpoints: (builder) => ({
    getHello: builder.mutation<{ secretKey: string }, void>({
      query: () => ({ url: ``, method: 'POST' }),
    }),
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
          url: `/register` + (invKey ? `?key=${invKey}` : ''),
          method: 'POST',
          body: { ...body },
        };
      },
      onQueryStarted: async (state, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            addNewClinic({
              memberId: data.id,
              serverLocation: parseInviteKey(state.invKey ?? '127.0.0.1')
                .location,
            }),
          );
        } catch (e) {
          console.log(e);
        }
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
        };
      },
    }),
  }),
});
export default authApi;
export const {
  useRegisterMutation,
  useConnectMemberMutation,
  useGetHelloMutation,
} = authApi;
