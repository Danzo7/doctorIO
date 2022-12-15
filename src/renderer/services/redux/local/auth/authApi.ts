/* eslint-disable @typescript-eslint/naming-convention */
import { parseInviteKey } from '@helpers/crypto/parse';
import { authType } from '@models/auth.type';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { useAuthStore } from '@stores/authStore';
import { useClinicsStore } from '@stores/clinicsStore';
import { useConnectionStore } from '@stores/ConnectionStore';

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
          useClinicsStore.getState().addNewClinic(
            'randomName', //todo get real name from backend
            state.invKey && state.invKey.length > 0
              ? parseInviteKey(state.invKey).location
              : '127.0.0.1:3000',
            data.id,
          );
          useAuthStore.getState().setTokens({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          });
          useConnectionStore.getState().connect();
          dispatch({ type: 'RESET' });
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
          const { data } = await queryFulfilled;
          useAuthStore.getState().setTokens({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          });
          dispatch({ type: 'RESET' });
        } catch (e) {
          //
        }
      },
    }),
    disconnectMember: builder.mutation<boolean, void>({
      query: () => {
        return { url: '/disconnect', method: 'POST' };
      },
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          useConnectionStore.getState().disconnect();
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
