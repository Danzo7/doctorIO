import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createQuery } from '@stores/staticQueriesStore';

const invitationApi = createApi({
  reducerPath: 'invitationApi',
  baseQuery: createQuery('clinic/invite').query,
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
      { key: string },
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
