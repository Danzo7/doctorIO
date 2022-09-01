/* eslint-disable @typescript-eslint/naming-convention */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const invitationApi = createApi({
  reducerPath: 'invitationApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/clinic/invite' }),
  endpoints: (builder) => ({
    getInvitation: builder.query<
      {
        key: string;
        roles: {
          id: number;
          name: string;
        }[];
        expiredDate: Date;
      },
      void
    >({ query: () => '' }),
    createInvitation: builder.mutation<
      string,
      { type: 'JOIN' | 'RELINK'; roles?: number[]; relinkToId?: number }
    >({
      query: (body) => {
        return { url: '', method: 'POST', body: { ...body } };
      },
    }),
    deleteInvitation: builder.mutation<boolean, void>({
      query: () => {
        return { url: '', method: 'POST' };
      },
    }),
  }),
});
export default invitationApi;
export const {
  useGetInvitationQuery,
  useCreateInvitationMutation,
  useDeleteInvitationMutation,
} = invitationApi;
