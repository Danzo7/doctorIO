/* eslint-disable @typescript-eslint/naming-convention */
import { parseInviteKey } from '@helpers/crypto/parse';
import { authType } from '@models/auth.type';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { disconnect } from '../connectionStateSlice';
import { addNewClinic } from '../user/userSlice';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: StaticQueries.authQuery.query,
  endpoints: (builder) => ({
    register: builder.mutation<
      authType,
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
              serverLocation:
                state.invKey && state.invKey.length > 0
                  ? parseInviteKey(state.invKey).location
                  : '127.0.0.1:3000',
            }),
          );
          dispatch({ type: 'RESET' });
          //  StaticQueries.authQuery.discardUrl();
        } catch (e) {
          throw new Error('error in register: ' + e);
        }
      },
    }),
    connectMember: builder.mutation<
      authType,
      { memberId: number; secretKey: string }
    >({
      query: (body) => {
        return {
          url: '/login',
          method: 'POST',
          body: { ...body },
        };
      },
      onQueryStarted: async (state, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;

          dispatch({ type: 'RESET' });
          //  StaticQueries.authQuery.discardUrl();
        } catch (e) {
          throw new Error("Error while connecting to member's account");
        }
      },
    }),
    disconnectMember: builder.mutation<boolean, void>({
      query: () => {
        return { url: '/disconnect', method: 'POST' };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          disconnect(dispatch);
        } catch (err) {
          //console.log(err);
        }
      },
    }),
    refresh: builder.mutation<
      { access_token: string; refresh_token: string },
      void
    >({
      query: () => {
        return {
          url: '/refresh',
          method: 'POST',
        };
      },
      extraOptions: { useRefresh: true },
    }),
    relink: builder.mutation<
      { access_token: string; refresh_token: string },
      void
    >({
      query: () => {
        return {
          url: '/relink',
          method: 'POST',
        };
      },
    }),
  }),
});
export default authApi;
export const {
  useRegisterMutation,
  useConnectMemberMutation,
  useDisconnectMemberMutation,
  useRefreshMutation,
} = authApi;
