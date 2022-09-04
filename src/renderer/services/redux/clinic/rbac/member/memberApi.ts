/* eslint-disable @typescript-eslint/naming-convention */
import { Member, MemberBrief, PermKeys } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: StaticQueries.members.query,
  tagTypes: ['members'],
  endpoints: (builder) => ({
    getMembers: builder.query<MemberBrief, void>({
      query: () => '',
      providesTags: ['members'],
    }),

    getMemberById: builder.query<MemberBrief, number>({
      query: (id) => `/${id}`,
    }),
    getMemberDetail: builder.query<Member, number>({
      query: (id) => `/detail?id=${id}`,
    }),
    getMyPermission: builder.query<
      { permissions: PermKeys[]; lvl: number },
      void
    >({ query: () => '/me/permissions' }),
    getMyMemberDetail: builder.query<Member, void>({ query: () => '/me/' }),
  }),
});
export default memberApi;
export const {
  useGetMembersQuery,
  useGetMyPermissionQuery,
  useGetMemberByIdQuery,
  useGetMemberDetailQuery,
  useGetMyMemberDetailQuery,
  useLazyGetMemberByIdQuery,
} = memberApi;
